import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,) {}

    async create(user: CreateUserDto): Promise<User> {
        //I used hashing password for more security
        user.password=await this.hashPassword(user.password);
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async readAll(): Promise<User[]> {
        //I only specify the fullname, it appears on the rest of the registered members
        return await this.userModel.find().select({ "fullName": 1, "_id": 0}).exec();
    }

    async findUserByUsername(username: string): Promise<User>{
        const user=await this.userModel.findOne({username:username}).exec();
        return user;
    }

    async hashPassword(password: string): Promise<string> {
         return await bcrypt.hash(password, Number(process.env.HASH_SALT));
     }
}
