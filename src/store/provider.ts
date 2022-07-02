import React, {useContext} from "react";
import {storeType} from './store'

export const StoreContext = React.createContext(null)

export const useStore = () => useContext<storeType>(StoreContext)