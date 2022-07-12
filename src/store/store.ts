import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../taskManagers/types';

class UserStore {
  token = 'c2df91c1c3fa29e68b3fa35b62a5213d352259cb'

  host = 'https://tasks.rcbi.pro'

  me : IUser = null

  isAuth = false

  constructor() {
    makeObservable(this, {
      token: observable,
      isAuth: observable,
      me: observable,
      setToken: action,
      setMe: action,
    })
  }

  setToken = str => {
    this.token = str
  }

  setMe = me => {
    this.me = me
  }
}

const store = new UserStore()

export type StoreType = typeof store

export default store
