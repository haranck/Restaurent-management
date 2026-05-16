export interface IUser {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}
