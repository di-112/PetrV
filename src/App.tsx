import React from 'react';
import Header from "./components/Header";
import {ChakraProvider} from '@chakra-ui/react'
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import {StoreContext} from "./store/provider";
import store from './store/store'
import Plans from "./components/Plans";
import Tasks from "./components/Tasks";

const App = () => {
    return (
        <ChakraProvider>
            <StoreContext.Provider value={store}>
                <HashRouter>
                    <Header />
                    <Routes>
                        <Route index element={<Tasks />} />
                        <Route path="/plans" element={<Plans />} />
                    </Routes>
                </HashRouter>
            </StoreContext.Provider>
        </ChakraProvider>
    );
};

export default App;