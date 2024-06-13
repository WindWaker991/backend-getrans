import { Contact } from "./contact.interface";

export interface BankAccount {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rut: string;
    accountNumber: string;
    contact: Contact;
    //contactId: string;
}

