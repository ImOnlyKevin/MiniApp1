import { useContext } from "react"
import { appContext } from "../../App"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    const handleUser = () => {
        document.cookie = 'user=; Max-Age=-99999999;'
        navigate('/')
    }


    return (
        <>
        Current user: {document.cookie.split('; ').find(row => row.startsWith('user='))?.split('=')[1]}
        <button onClick={() => handleUser()}>Switch User</button>
        </>
    )
}

export default Header