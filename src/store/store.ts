import {
  action, computed, makeObservable, observable,
} from 'mobx';
import { IUser } from '../taskManagers/types';

class UserStore {
  token = 'c2df91c1c3fa29e68b3fa35b62a5213d352259cb'

  email = 'd.vezankin@dev.zencode.team'

  host = 'https://tasks.rcbi.pro'

  isLoading = false

  me : IUser = null

  constructor() {
    makeObservable(this, {
      token: observable,
      isLoading: observable,
      isAuth: computed,
      isAllSettings: computed,
      me: observable,
      setToken: action,
      setIsLoading: action,
      setMe: action,
    })
  }

  setToken = str => {
    this.token = str
  }

  setMe = me => {
    this.me = me
  }

  setIsLoading = bool => {
    this.isLoading = bool
  }

  get isAuth() {
    return !!this.me?.token
  }

  get isAllSettings() {
    return this.me?.apiKey && this.me?.taskTracker
  }
}

const store = new UserStore()

export type StoreType = typeof store

export default store
