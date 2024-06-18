import {
  Controller
  , Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateBankAccountDto } from '../bank_accounts/dto/create-bank_account.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { ValidatePassDto } from './dto/validate-pass.dto';
import { validateHeaderName } from 'http';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() createAuthDto: LoginPayloadDto) {
    return this.authService.login(createAuthDto);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.authService.register(createBankAccountDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('validate_me_pass')
  create(@Body() validateMePass: ValidatePassDto) {
    return this.authService.validateMePass(validateMePass);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }


}
