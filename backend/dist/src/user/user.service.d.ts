import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, PublicUser, LoginUserDto, UpdateUserPutDto } from './dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<PublicUser[]>;
    findById(id: number): Promise<PublicUser>;
    findByQuery(userName: string): Promise<PublicUser[]>;
    create(data: CreateUserDto): Promise<PublicUser>;
    deleteUser(id: number): Promise<PublicUser>;
    updateUser(id: number, userData: UpdateUserPutDto): Promise<PublicUser>;
    loginUser(dto: LoginUserDto): Promise<{
        login: string;
    }>;
}
