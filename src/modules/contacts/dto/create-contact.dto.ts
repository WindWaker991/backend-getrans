import { BankAccount } from "src/interfaces/bank_account.interface";
import { Contact } from "src/interfaces/contact.interface";

export class CreateContactDto implements Contact{
    id: string;
    bankAccount: BankAccount;
}
