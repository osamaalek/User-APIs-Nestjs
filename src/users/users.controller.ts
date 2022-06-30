import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}


    //Regeister Api
    @Post()
    async createUser(@Res() response, @Body() user: CreateUserDto) {
        
        try{
            const newUser = await this.userService.create(user);
            return response.status(HttpStatus.CREATED).json({
                message:'Account successfully created'});
        } catch {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not created!'
                });
        }
    }

    //Get All Users
    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAllUsers(@Res() response) {
        const users = await this.userService.readAll();
        return response.status(HttpStatus.OK).json({
            users
        });
    }

}
