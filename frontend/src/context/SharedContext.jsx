import React, { createContext, useContext, useState } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
    const [sharedText, setSharedText] = useState("");

    return (
        <SharedContext.Provider value={{ sharedText, setSharedText }}>
            {children}
        </SharedContext.Provider>
    );
};

export const useShared = () => useContext(SharedContext);
