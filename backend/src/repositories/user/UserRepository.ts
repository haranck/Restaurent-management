import { injectable } from "tsyringe";
import prisma from '../../config/prisma'
import { IUserRepository } from "./IUserRepository";
import { User } from "@prisma/client";

@injectable()
export class UserRepository implements IUserRepository {

    async create(data: { email: string; name: string; password: string }): Promise<User> {
        return await prisma.user.create({ data });
    }
    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }
}