import React,{createContext ,useState,useEffect,useContext} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    // localStorage
    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        const storedtoken = localStorage.getItem('token')

        if(storedUser && storedtoken)
        {
            setUser(JSON.parse(storedUser))
            setToken(storedtoken)
            setIsLoggedIn(true)
        }
    },[]);

    const login = (userData,token) =>{
        localStorage.setItem('user',JSON.stringify(userData))
        localStorage.setItem('token',token)
        setUser(userData)
        setToken(token)
        setIsLoggedIn(true)
    }


    const loggedOut = ()=>{
         localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
        setIsLoggedIn(false)
    }

    return(
        <AuthContext.Provider value={{user,token,isLoggedIn,login,loggedOut}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
  return useContext(AuthContext);
};
