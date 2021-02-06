import { Person } from "./Person";

export interface Order {
    user?: Person;
    order_details?: any;
}

export enum OrderStatus {
    PROCESANDO = 'P'
}

export interface OrderCustomer {
    id?: number;
    customerId?: string;
    date?: string;
    totalAmount?: number;
    state?: string;
    state_message?: string;
}