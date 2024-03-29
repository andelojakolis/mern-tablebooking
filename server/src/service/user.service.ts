import { ApolloError } from "apollo-server";
import { CreateUserInput, GetUserInfoInput, LoginInput, UserModel } from "../schema/user.schema";
import bcrypt from 'bcrypt';
import { signJwt } from "../utils/jwt";
import Context from "../types/context";

class UserService {
    async createUser(input: CreateUserInput) {
      const user = await this.findByEmail(input.email)
      if(!user){
        return UserModel.create(input)
      } else {
        throw new ApolloError('User with this email already exists!')
      }
    }

    async login(input: LoginInput, context: Context) {
        const user = await this.findByEmail(input.email)
        if(!user) throw new ApolloError('Invalid email or password!')

        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(!isPasswordValid) throw new ApolloError('Invalid email or password!')

        const jwtPayload = {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        const token = signJwt(jwtPayload);

        return { token, userId: user.id };
    }

    async findByEmail(email: string) {
        return await UserModel.findOne({email})
    }

    async getUserById(input: GetUserInfoInput) {
      const data = await UserModel.findOne(input)
      return data
    }
}

export default UserService;