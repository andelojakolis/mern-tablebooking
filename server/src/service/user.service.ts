import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import bcrypt from 'bcrypt'
import { signJwt } from "../utils/jwt";
import Context from "../types/context"

class UserService {
    async createUser(input: CreateUserInput) {
        return UserModel.create(input)
    }

    async login(input: LoginInput, context: Context) {
        const user = await this.findByEmail(input.email)
        if(!user) throw new ApolloError('Invalid email or password!')

        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(!isPasswordValid) throw new ApolloError('Invalid email or password!')

        const token = signJwt(user);

        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        return token;
    }

    async findByEmail(email: string) {
        return await UserModel.findOne({email})
    }
}

export default UserService;