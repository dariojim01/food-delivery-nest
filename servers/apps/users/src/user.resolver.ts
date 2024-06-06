import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterRepose } from "./types/user.type";
import { RegisterDto } from "./dto/user.dto";
import { BadRequestException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Response } from "express";


@Resolver('User')
export class UserResolver {
    constructor(
        private readonly userService: UsersService
    )
    {}

    @Mutation(() => RegisterRepose)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context : { res: Response },

    ) : Promise<RegisterRepose>{
        if(!registerDto.name || !registerDto.email || !registerDto.password){
            throw new BadRequestException('Todos los campos son obligatorios')
        }

        const user = await this.userService.register(registerDto, context.res);

        return {user};
    }


    @Query(() => [ User ])
    async getUsers(){
        return this.userService.getUsers();
    }
}
