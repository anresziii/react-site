import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context'
import MyButton from '../button/MyButton'

const NavBar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                LogOut
            </MyButton>
            <div className="navbar_links">
                <Link to="/about">О нас</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    )
}

export default NavBar
