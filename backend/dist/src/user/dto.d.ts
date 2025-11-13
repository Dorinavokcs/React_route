export declare class CreateUserDto {
    name: string;
    email: string;
    birthdate?: string;
    password: string;
}
export declare class UpdateUserPutDto {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
}
export declare class PublicUser {
    id: number;
    name: string;
    email: string;
    birthdate?: Date | null;
    password?: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
