import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';

export interface JwtPayload {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: GenderEnum;
  role: RoleEnum;
}
