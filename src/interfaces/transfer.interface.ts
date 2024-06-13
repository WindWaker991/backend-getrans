import { BankAccount } from "./bank_account.interface";

export interface Transfer {
    id: string;
    amount: number;
    description: string;
    date: Date;
    origin: BankAccount;
    destination: BankAccount;
}
