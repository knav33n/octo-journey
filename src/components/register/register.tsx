import { Cancel, Room } from "@mui/icons-material"
import axios from "axios"
import React, { useContext, useRef, useState } from "react"
import { AppContext } from "../layout/layout"
import "./register.css"

export const Register = () => {
    const [app, setApp] = useContext(AppContext)!
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }

        try {
            await axios.post("/v1/users/register", user)
            setError(null)
            setSuccess(true)
        } catch (error) {
            setError(error.message)
            console.error(error)
        }
    }

    const hideRegistration = () => setApp({ ...app, showLogin: false, showRegister: false })

    return (
        <div className="container">
            <div className="logo">
                <Room /> Travel App
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={usernameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="register-btn" type="submit">Register</button>
                {success && <span className="success">Successfull, you can login now!</span>}
                {error && <span className="error">{error}</span>}
            </form>
            <Cancel className="cancel-register" onClick={hideRegistration} />
        </div>
    )
}