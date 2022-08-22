import {IBase} from './base';

export interface IProfile extends IBase {
  username: string;
  website: string;
  avatar_url: string;
}
