import React from 'react';
import useLocalStorage from '../hooks/HookLocalStorage';

const AuthCon = React.createContext([null, () => {}]);

export const AuthProv = (props) => {
    const [authState, setAuthState] = useLocalStorage("key", null);

    return <AuthCon.Provider value={[authState, setAuthState]}>{props.children}</AuthCon.Provider>;

}

export default AuthCon;