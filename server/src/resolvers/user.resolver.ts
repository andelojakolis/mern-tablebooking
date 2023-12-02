import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { CreateUserInput, User, LoginInput } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {

    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Mutation(() => User)
    createUser(@Arg('input') input: CreateUserInput){
        return this.userService.createUser(input)
    }

    @Mutation(() => String) // Returns token
    login(@Arg('input') input: LoginInput, @Ctx() context: Context){
        return this.userService.login(input, context)
    }

    @Query(() => User)
    me() {
        return {
            _id: "123",
            name: "Jane Doe",
            email: "Jane Doe",
        };
    }
}