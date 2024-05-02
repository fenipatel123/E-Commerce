
import { Request, Response } from 'express';
import CartModel from '../models/cartModel' ;
import OrderModel from '../models/orderModel';
import { Product } from '../interface/product';
import { Order } from '../interface/order';

export async function placeOrder(req: Request, res: Response): Promise<void> {
  const userId = req.user?._id; 

  try {
    let cart = await CartModel.findOne({ userId }).populate('items.productId'); // Populate product information
    

    if (!cart || cart.items.length === 0) {
      res.status(400).send({ message: 'Cart is empty. Add items to cart before placing an order' });
      return;
    }

    let totalAmount = 0;
    for (const cartItem of cart.items) {
      const product = cartItem.productId as unknown as Product; 
      if (product && product.price) { 
        totalAmount += product.price * cartItem.quantity;
      } else {
        console.error(`Product or price missing for cart item with productId ${cartItem.productId}`);
      }
    }

    const order = new OrderModel({
      userId,
      cartId: cart._id,
      items: cart.items.map(item => ({ productId: item.productId._id, quantity: item.quantity })), 
      totalAmount,
      status: 'Processing', 
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(200).send({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!', error });
  }
}

export async function getOrderHistory(req: Request, res: Response): Promise<void> {
    const userId = req.user?._id;
    const orderId = req.params.id 
  
    try {
      if (orderId) {
        // If orderId is provided, fetch a specific order
        const order: Order | null = await OrderModel.findOne({ _id: orderId, userId }).exec();
  
        if (!order) {
          res.status(404).send({ message: 'Order not found for the user' });
          return;
        }
  
        res.status(200).send({ order });
      } else {
        // If orderId is not provided, fetch all orders for the user
        const orders: Order[] = await OrderModel.find({ userId }).sort({ createdAt: 'desc' }).exec();
  
        res.status(200).send({ orders });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
  }

  export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
    const orderId = req.params.id;
    const newStatus = req.body.status;
  
    try {
      const order = await OrderModel.findById(orderId);
  
      if (!order) {
        res.status(404).send({ message: 'Order not found' });
        return;
      }
  
      order.status = newStatus;
      await order.save();
  
      res.status(200).send({ message: 'Order status updated successfully', order });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
  }

  export async function listAllOrders(req: Request, res: Response): Promise<void> {
    try {
        const orders: Order[] = await OrderModel.find();

        if (orders) {
            res.status(200).send({
                message: 'All orders lists fetched successfully',
                listCategories: orders
            });
            return;
        }

        res.status(200).send({});
  
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
  }