import { useContext } from "react"
import { AppContext } from "../layout/layout"
import "./header.css"

export const Header = () => {
    const appCtx = useContext(AppContext)
    const [app, setApp] = appCtx!

    const showRegistration = () => setApp({ ...app, showLogin: false, showRegister: true })
    const showLogin = () => setApp({ ...app, showLogin: true, showRegister: false })
    const logout = () => {
        localStorage.removeItem("user")
        setApp({ currentUser: null, showLogin: false, showRegister: false })
    }

    if (app.currentUser)
        return <button className='button logout' onClick={logout}>Log out</button>

    return (<div className='buttons'>
        <button className='button login' onClick={showLogin}>Login</button>
        <button className='button register' onClick={showRegistration}>Register</button>
    </div>
    )
}