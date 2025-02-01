import React, { createContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

// Crear un proveedor de contexto
export const AppProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState([]); // Define aquí tu estado global

    return (
        <AppContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </AppContext.Provider>
    );
};
