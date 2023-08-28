import { PictureInterface } from 'interfaces/picture';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AlbumInterface {
  id?: string;
  name: string;
  description?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  picture?: PictureInterface[];
  organization?: OrganizationInterface;
  _count?: {
    picture?: number;
  };
}

export interface AlbumGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
}
