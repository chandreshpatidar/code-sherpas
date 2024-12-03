import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from './accounts.service';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all account and associated users' })
  async findAll() {
    const accounts = await this.accountService.getAllAccounts();

    return accounts.map((account) => ({
      id: account.id,
      iban: account.iban,
      balance: account.balance,
      owner: {
        id: account.owner.id,
        name: account.owner.name,
        email: account.owner.email,
      },
      type: account.type,
    }));
  }
}
