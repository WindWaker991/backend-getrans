export class CreateTransferDto {
    amount: number;
    description: string;
    date: Date;
    originId: string;
    destinationId: string;
}
