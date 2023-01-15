import { UserService } from '@app/db/entities/user/user.service';
import { Sequelize } from 'sequelize';
import { testingDb } from '@app/utils/testing/testing-db';
import { User, UserRole } from '@app/db/entities/user/user.entity';
import { CacheModule } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../../../../../apps/panel_admin/src/dto/register.dto';
import { LoginDto } from '../../../../../apps/panel_admin/src/dto/login.dto';
import { UserUpdateDto } from '../../../../../apps/panel_admin/src/dto/user-update.dto';

describe('UserService', () => {
  let userService: UserService;
  let db: Sequelize;
  let cache: CacheModule;

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    db = await testingDb([User]);

    // Instantiate our service with our model
    userService = new UserService(User, cache);
  });

  afterEach(async () => {
    await db.truncate();
  });

  afterAll(() => db.close());
  //

  it('should return true with existing email', async (): Promise<void> => {
    await User.create({
      email: 'john@example.com',
    });

    const result: boolean = await userService.userExists({
      email: 'john@example.com',
    });

    expect(result).toBeTruthy();
  });
  it('should return false when user not exists', async (): Promise<void> => {
    await User.create({
      email: 'john@example.com',
    });

    const result: boolean = await userService.userExists({
      email: 'john22@example.com',
    });

    expect(result).toBeFalsy();
  });

  it('should return true when seller exists with determine id', async (): Promise<void> => {
    const user: User = await User.create({
      role: UserRole.SELLER,
    });

    const result: boolean = await userService.sellerExists(user.id);

    expect(result).toBeTruthy();
  });

  it('should return false when cannot find seller with determine id', async (): Promise<void> => {
    const user: User = await User.create({
      role: UserRole.ADMIN,
    });

    const result: boolean = await userService.sellerExists(user.id);

    expect(result).toBeFalsy();
  });

  it('should register new user', async (): Promise<void> => {
    const dto: RegisterDto = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'secret',
      password_repeat: 'secret',
    };

    const result: User = await userService.registerUser(dto);

    expect(result).toMatchObject({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    });

    expect(await User.findAll()).toHaveLength(1);
  });

  it('should login success', async (): Promise<void> => {
    const dto: LoginDto = {
      email: 'john@example.com',
      password: 'secret',
    };

    await User.create({
      email: 'john@example.com',
      password: await bcrypt.hash('secret', 10),
    });

    const result: User = await userService.loginUser(dto);

    expect(result).toMatchObject({
      email: 'john@example.com',
    });
  });

  it('should login password incorrect', async (): Promise<void> => {
    const dto: LoginDto = {
      email: 'john@example.com',
      password: 'secret123',
    };

    await User.create({
      email: 'john@example.com',
      password: await bcrypt.hash('secret', 10),
    });

    try {
      await userService.loginUser(dto);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Not Found Exception');
    }
  });

  it('should return user by email', async (): Promise<void> => {
    const user: User = await User.create({
      email: 'info@example.com',
    });

    const result: User = await userService.findByEmail('info@example.com');

    expect(result.email).toEqual(user.email);
  });

  it('should return me user', async (): Promise<void> => {
    const user: User = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      role: UserRole.ADMIN,
      public_address: '0x123',
    });

    const result: User = await userService.me(user.id);

    expect(result.id).toEqual(user.id);
  });

  it('should return user list', async (): Promise<void> => {
    await User.create();
    await User.create();
    await User.create();

    const result: User[] = await userService.userList();

    expect(result).toHaveLength(3);
  });

  it('should return user by id', async (): Promise<void> => {
    const user: User = await User.create();

    const result: User = await userService.findUserById(user.id);

    expect(result.id).toEqual(user.id);
  });

  it('should return user by id with not exists', async (): Promise<void> => {
    try {
      await userService.findUserById(0);
    } catch (e) {
      expect(e.message).toBe('Not Found Exception');
    }
  });

  it('should update user success', async (): Promise<void> => {
    const user: User = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      role: UserRole.ADMIN,
      public_address: '0x123',
    });

    const dto: UserUpdateDto = {
      first_name: 'Johny',
      last_name: 'Doli',
      role: UserRole.SELLER,
      public_address: '0x1234',
    };
    await userService.updateUser(user.id, dto);

    expect(
      await User.findOne({
        where: {
          first_name: 'Johny',
          last_name: 'Doli',
          role: UserRole.SELLER,
          public_address: '0x1234',
        },
      }),
    ).toBeTruthy();
  });

  it('should delete user success', async (): Promise<void> => {
    const user: User = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      role: UserRole.ADMIN,
      public_address: '0x123',
    });

    await userService.deleteUser(user.id);

    expect(
      await User.findOne({
        where: {
          id: user.id,
        },
      }),
    ).toBeFalsy();
  });
});
