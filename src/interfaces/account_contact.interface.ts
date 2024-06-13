import { BankAccount } from "./bank_account.interface";
import { Contact } from "./contact.interface";

export interface AccountContact {
    id: string;
    contact: Contact;
    account: BankAccount;
}