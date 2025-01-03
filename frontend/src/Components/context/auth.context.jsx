import { createContext, useState, useContext } from "react";

// Tạo AuthContext
export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        username: "",
    }
});

// Tạo AuthWrapper để bao bọc ứng dụng
export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            username: "",
        }
    });

    const [appLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
