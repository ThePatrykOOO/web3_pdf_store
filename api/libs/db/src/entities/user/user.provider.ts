import { User } from '@app/db/entities/user/user.entity';

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
