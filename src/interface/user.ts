
export interface User{
    _id: string
    name: string;
    email: string;
    password:string;
    profile?: {
        age?: number;
        phone?: string;
        address?: string;
      };
    role: string; 
    createdAt: Date;
    updatedAt: Date;
  }
  