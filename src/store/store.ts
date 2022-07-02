import {action, makeObservable, observable} from "mobx";
import {IUser} from "../taskManagers/types";

class UserStore {
    token : string = 'c2df91c1c3fa29e68b3fa35b62a5213d352259cb'
    me : IUser = null

    constructor() {
        makeObservable(this, {
            token: observable,
            me: observable,
            setToken: action,
            setMe: action
        })
    }

    setToken = str => this.token = str

    setMe = me => this.me = me
}

const store = new UserStore()

export type storeType = typeof store

export default store