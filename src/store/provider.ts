import React, { useContext } from 'react';
import { StoreType } from './store'

export const StoreContext = React.createContext(null)

export const useStore = () => useContext<StoreType>(StoreContext)
