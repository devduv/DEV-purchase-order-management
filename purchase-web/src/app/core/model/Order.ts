import { Person } from "./Person";

export interface Order {
    user?: Person;
    order_details?: any;
}