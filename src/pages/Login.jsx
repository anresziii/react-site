import React, { useContext } from 'react'
import MyButton from '../components/ui/button/MyButton'
import MyInput from '../components/ui/input/MyInput'
import { AuthContext } from '../context'

const Login = () => {

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const login = e => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Login" />
                <MyInput type="text" placeholder="Pass" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login
