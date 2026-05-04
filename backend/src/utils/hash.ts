import bcrypt from "bcryptjs"

export const hashPassword = async (password:string) => {
    return await bcrypt.hash(password,10)
}

export const comparePassword = async (password:string,hash:string) => {
    return await bcrypt.compare(password,hash)
}

//   "scripts": {
//     "dev": "nodemon server.ts",
//     "build": "tsc",
//     "start": "node dist/server.js",
//     "db:migrate": "prisma migrate dev",
//     "db:push": "prisma db push",
//     "db:seed": "prisma db seed",
//     "db:generate": "prisma generate",
//     "db:dev": "prisma dev",
//     "db:studio": "prisma studio",
//     "dev:all": "concurrently \"npm run dev\" \"npm run db:studio\""
//   },