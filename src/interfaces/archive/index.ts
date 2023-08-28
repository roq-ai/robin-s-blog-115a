import { PictureInterface } from 'interfaces/picture';
import { GetQueryInterface } from 'interfaces';

export interface ArchiveInterface {
  id?: string;
  name: string;
  description?: string;
  picture_id: string;
  created_at?: any;
  updated_at?: any;

  picture?: PictureInterface;
  _count?: {};
}

export interface ArchiveGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  picture_id?: string;
}
