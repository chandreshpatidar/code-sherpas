import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({ example: 100, description: 'The amount to deposit' })
  amount: number;
}

export class WithdrawDto {
  @ApiProperty({ example: 50, description: 'The amount to withdraw' })
  amount: number;
}

export class TransferDto {
  @ApiProperty({
    example: 'acc2',
    description: 'The destination account ID',
  })
  toAccountId: string;

  @ApiProperty({ example: 200, description: 'The amount to transfer' })
  amount: number;
}
