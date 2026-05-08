import bcrypt from "bcryptjs";
import { ENV } from "../config/env.config";

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};