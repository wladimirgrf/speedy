import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
  email: string;
  name: string;
  password: string;
}
