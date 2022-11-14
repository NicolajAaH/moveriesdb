import React, { useState } from "react";

//UserContext holds a name for the user
const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
    const [name, setName] = useState('Not yet set');

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

export { UserProvider };