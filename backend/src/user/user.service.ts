import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, PublicUser, LoginUserDto, UpdateUserPutDto } from './dto';
import * as argon2 from 'argon2';

// export type PublicUser = Pick<User, 'name' | 'email' | 'birthdate'>;
// export type CreateUser = Omit<User, 'id' | 'createdAt' |'updatedAt'>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // Metódus felhasználók lekéréséhez (GET): Erre már nincs szükség.
  async findAll(): Promise<PublicUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, email: true, birthdate: true },
    });
    return users;
  }

  async findById(id: number): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: {id}, // {id: id} lenne, de mivel a kulcs és az érték azonos nevű, ezért elég az egyik.
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true,
      }
    })
    if (!user) throw new NotFoundException(`User with ${id} not found.`);
    return user;
  }

  async findByQuery(userName: string): Promise<PublicUser[]> {
    // Ez case insensitive!!
    return await this.prisma.user.findMany({
      where: {name: {
        equals: userName
      }},
      orderBy:{name: 'asc'},
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true
      }  
      });
  }

  // Metódus felhasználó létrehozásához (POST):
  async create(data: CreateUserDto): Promise<PublicUser> {
    const exists = await this.prisma.user.findUnique({where: {email: data.email}});
    if (exists) throw new ConflictException('Email already registered.');

    // Titkosítás - hash-elés:
    const hash = await argon2.hash(data.password, {type: argon2.argon2id});

    const bDate = data.birthdate ? new Date(data.birthdate) : null;
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        birthdate: bDate ?? null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        birthdate: true,
      },
    });
  }

  async deleteUser(id: number): Promise<PublicUser> {
    const exists = await this.prisma.user.findUnique({where: {id}});
    if (!exists) throw new NotFoundException(`User with ${id} not found.`);
    return await this.prisma.user.delete({where: {id}});
  }

  async updateUser(id: number, userData: UpdateUserPutDto): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: {id} });
    if (!user)  throw new NotFoundException (`User with ID ${id} not found.`);
    const bDate = userData.birthdate ? new Date(userData.birthdate) : null;
    const updatedUser = await this.prisma.user.update({
      where: {id},
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        birthdate: bDate
      }
    });
    return updatedUser;
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({where: 
      {email: dto.email},
    select: {
      id: true,
        name: true,
        email: true,
        birthdate: true,
        password: true,
    }});
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isBasicPassword = await argon2.verify(user.password, dto.password);
    if (!isBasicPassword) {
      throw new UnauthorizedException('Invalid password!');
    }
    return {login: "ok"};
  }

}
