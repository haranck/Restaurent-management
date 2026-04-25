import { injectable } from "tsyringe";
import prisma from "../../config/prisma";
import { IRestaurantRepository } from "./IRestaurantRepository";

@injectable()
export class RestaurantRepository implements IRestaurantRepository {
  async create(data: { name: string; address: string; contact: string }) {
    return prisma.restaurant.create({ data });
  }

  async findAll() {
    return prisma.restaurant.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  async findById(id: string) {
    return prisma.restaurant.findUnique({ where: { id } });
  }

  async update(id: string, data: { name: string; address: string; contact: string }) {
    return prisma.restaurant.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    await prisma.restaurant.delete({ where: { id } });
  }
}