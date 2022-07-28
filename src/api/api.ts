import axios from 'axios';
import { IUser } from '../taskManagers/types';

const axiosBase = axios.create({
  baseURL: 'https://petr-backend.herokuapp.com/',
})

export const api = {
  getUser: (token: string) : Promise<IUser> => axiosBase.get('/users', {
    params: { token },
  }).then(({ data }) => data),

  removeUser: (token: string) => axiosBase.delete('/users', {
    params: { token },
  }).then(({ data }) => data),

  addUser: (user: IUser) => axiosBase.post('/users', { user }).then(({ data }) => data),

  updateUser: (user: IUser) => axiosBase.put('/users', { user }).then(({ data }) => data),
}
