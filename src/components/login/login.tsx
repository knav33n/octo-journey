import { Cancel, Room } from "@mui/icons-material"
import { useContext, useEffect } from "react"
import useFormSubmit from "../../hooks/useFormSubmit"
import { AppContext } from "../layout/layout"
import "./login.css"

interface FormData {
    username: string
    password: string
}

interface FormResponse {
    _id: string
    username: string
}

export const Login = () => {
    const [app, setApp] = useContext(AppContext)!
    const {
        formData,
        isLoading,
        error,
        response,
        handleChange,
        handleSubmit
    } = useFormSubmit<FormData, FormResponse>('/v1/users/login');

    const hideLogin = () => setApp({ ...app, showLogin: false, showRegister: false })

    useEffect(() => {
        if (response) {
            setApp({ currentUser: response?.username, showLogin: false, showRegister: false })
            localStorage.setItem("user", response?.username);
        }
    }, [response, setApp])

    return (
        <div className="container">
            <div className="logo">
                <Room /> Travel App
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={formData?.username ?? ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData?.password ?? ''}
                    onChange={handleChange}
                />
                <button className="login-btn" type="submit" disabled={isLoading}>Login</button>
                {error && <span className="error">{error}</span>}
            </form>
            <Cancel className="cancel-register" onClick={hideLogin} />
        </div>
    )
}