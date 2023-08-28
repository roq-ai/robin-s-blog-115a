import { ArchiveInterface } from 'interfaces/archive';
import { AlbumInterface } from 'interfaces/album';
import { GetQueryInterface } from 'interfaces';

export interface PictureInterface {
  id?: string;
  title: string;
  caption?: string;
  tag?: string;
  order?: number;
  album_id: string;
  created_at?: any;
  updated_at?: any;
  archive?: ArchiveInterface[];
  album?: AlbumInterface;
  _count?: {
    archive?: number;
  };
}

export interface PictureGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  caption?: string;
  tag?: string;
  album_id?: string;
}
