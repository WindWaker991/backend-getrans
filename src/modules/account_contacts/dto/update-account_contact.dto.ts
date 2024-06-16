import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountContactDto } from './create-account_contact.dto';

export class UpdateAccountContactDto extends PartialType(CreateAccountContactDto) {
    contact_id: String;
    account_id: String;
}
