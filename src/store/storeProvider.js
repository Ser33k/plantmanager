import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const [user, setUser] = useState(null);


    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <StoreContext.Provider value={{ plants, setPlants, user, setUser }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
