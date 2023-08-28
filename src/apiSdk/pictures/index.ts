import axios from 'axios';
import queryString from 'query-string';
import { PictureInterface, PictureGetQueryInterface } from 'interfaces/picture';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPictures = async (query?: PictureGetQueryInterface): Promise<PaginatedInterface<PictureInterface>> => {
  const response = await axios.get('/api/pictures', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPicture = async (picture: PictureInterface) => {
  const response = await axios.post('/api/pictures', picture);
  return response.data;
};

export const updatePictureById = async (id: string, picture: PictureInterface) => {
  const response = await axios.put(`/api/pictures/${id}`, picture);
  return response.data;
};

export const getPictureById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pictures/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePictureById = async (id: string) => {
  const response = await axios.delete(`/api/pictures/${id}`);
  return response.data;
};
