import { injectable } from "tsyringe";
import prisma from "../../config/prisma";
import { IRestaurantRepository } from "./IRestaurantRepository";
import { CreateRestaurantDTO, UpdateRestaurantDTO } from "../../DTO/RestaurantDTO";

@injectable()
export class RestaurantRepository implements IRestaurantRepository {
  async create(data: CreateRestaurantDTO) {
    const { address, userId, ...rest } = data;
    
    return prisma.restaurant.create({
      data: {
        ...rest,
        user: {
          connect: { id: userId }
        },
        address: {
          create: address
        }
      },
      include: { address: true }
    });
  }

  async findAll() {
    return prisma.restaurant.findMany({
      include: { 
        address: true, 
        user: { 
          select: { id: true, name: true, email: true } 
        } 
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async findByUserId(userId: string) {
    return prisma.restaurant.findMany({
      where: { userId },
      include: { address: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async findById(id: string) {
    return prisma.restaurant.findUnique({
      where: { id },
      include: { address: true }
    });
  }

  async update(id: string, data: UpdateRestaurantDTO) {
    const { address, ...rest } = data;

    return prisma.restaurant.update({
      where: { id },
      data: {
        ...rest,
        address: address ? {
          upsert: {
            create: address,
            update: address,
          }
        } : undefined
      },
      include: { address: true }
    });
  }

  async delete(id: string) {
    await prisma.restaurant.delete({ where: { id } });
  }
}