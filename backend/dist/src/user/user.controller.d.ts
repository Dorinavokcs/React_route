import { UserService } from './user.service';
import { CreateUserDto, PublicUser, LoginUserDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getByQuery(name?: string): Promise<PublicUser[]>;
    getById(id: number): Promise<PublicUser>;
    create(body: CreateUserDto): Promise<PublicUser>;
    delete(id: number): Promise<PublicUser>;
    login(body: LoginUserDto): Promise<{
        login: string;
    }>;
}
