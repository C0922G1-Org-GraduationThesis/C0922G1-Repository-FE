import {Account} from './account';
import {Role} from './role';

export interface AccountRole {
  accountRoleId?: number;
  account?: Account;
  role?: Role;
}
