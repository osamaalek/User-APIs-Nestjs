import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/dto/loginUser.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Res() response, @Body() body: LoginUserDto) {

      try{
        //If the account here
          const user=await this.usersService.findUserByUsername(body.username);
          return response.status(HttpStatus.OK).json({
            access_token: await this.authService.login(user)
        });
      }catch{
        //If not
          return response.status(HttpStatus.NOT_FOUND).json({
              message: 'Error: User not found!'
          });
      }

  }
}
