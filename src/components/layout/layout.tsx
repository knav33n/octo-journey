import { ReactNode, createContext, useEffect, useState } from "react"
import { Header } from "../header/header"
import { Register } from "../register/register"
import { Login } from "../login/login";

interface Props {
    children: ReactNode
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const Layout = ({ children }: Props) => {
    const [app, setApp] = useState<App>({
        currentUser: null,
        showRegister: false,
        showLogin: false
    })

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setApp(prevState => { return { ...prevState, currentUser: user } })
        }
    }, [])


    return (
        <AppContext.Provider value={[app, setApp]}>
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
                {children}
                <Header />
                {app.showRegister && <Register />}
                {app.showLogin && <Login />}
            </div>
        </AppContext.Provider>
    )
}