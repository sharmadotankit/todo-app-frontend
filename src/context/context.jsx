import {createContext, useState} from "react";


export const ApplicationContext = createContext({
    currentUser:null,
    setCurrentUser: ()=>null,
    todos:[],
    setTodos:()=>null,
});

export const ApplicationContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const [todos,setTodos] = useState([]);

    const value = {currentUser,setCurrentUser,todos,setTodos}
    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}