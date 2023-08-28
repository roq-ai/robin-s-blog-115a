import axios from 'axios';
import queryString from 'query-string';
import { ArchiveInterface, ArchiveGetQueryInterface } from 'interfaces/archive';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getArchives = async (query?: ArchiveGetQueryInterface): Promise<PaginatedInterface<ArchiveInterface>> => {
  const response = await axios.get('/api/archives', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createArchive = async (archive: ArchiveInterface) => {
  const response = await axios.post('/api/archives', archive);
  return response.data;
};

export const updateArchiveById = async (id: string, archive: ArchiveInterface) => {
  const response = await axios.put(`/api/archives/${id}`, archive);
  return response.data;
};

export const getArchiveById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/archives/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteArchiveById = async (id: string) => {
  const response = await axios.delete(`/api/archives/${id}`);
  return response.data;
};
