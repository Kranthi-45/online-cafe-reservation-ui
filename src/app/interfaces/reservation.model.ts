import { Table } from "./table.model";
import { User } from "./user.model";

export interface Reservation {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    date?: Date;
    time?: string;
    numberOfPeople?: number;
    customMessage?: string;
    createdDate?: string;
    user?: User;
    table?: Table;
    status?: string;
  }
  