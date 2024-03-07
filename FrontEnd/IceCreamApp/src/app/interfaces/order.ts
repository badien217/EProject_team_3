import { OrderDetail } from "./order-detail";

export interface Order {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    amount: number;
    paymentOption?: string;
    transactionStatus?: boolean;
    orderDate: Date;
    orderDetails: OrderDetail[];
}
