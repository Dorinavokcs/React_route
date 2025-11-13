import { Body, Controller, Get, Post, Query, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserPutDto, PublicUser, LoginUserDto } from './dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Amint megszüntettem az első végpontot: getAll(), minden jó lett!!! Feltehetőleg azért, mert alapból, az url és method azonossága miatt, mindig az első futott le!! Amúgy is felesleges erre két végpont.
  @Get('users')
  async getByQuery(@Query('name') name?: string ): Promise<PublicUser[]> {
    if (!name) return await this.userService.findAll();
    return await this.userService.findByQuery(name);
  }

  @Get('users/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<PublicUser> {
    return await this.userService.findById(id);
  }

  @Post('users')
  async create(
    @Body()
    body: CreateUserDto,
  ): Promise<PublicUser> {
    return await this.userService.create(body);
  }

  @Delete('users/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<PublicUser> {
    return await this.userService.deleteUser(id)
  }

  @Post('auth/login')
  async login(@Body() body: LoginUserDto) {
    return await this.userService.loginUser(body)
  }
}
