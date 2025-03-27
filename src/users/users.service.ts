import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ total: number; users: User[] }> {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const total = await this.userModel.countDocuments();
    const users = await this.userModel.find().skip(skip).limit(limit).exec();
    return { total, users };
  }

  async findById(_id: string): Promise<User | null> {
    return await this.userModel.findOne({ _id }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}
