import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserRepository } from "src/DB/models/User/user.repository";

@Injectable()
export class userService {
    constructor(private readonly userRepository: UserRepository){}
    getProfile(request : Request){
        return request["user"]
    }
}