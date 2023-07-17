import { useContext, useEffect } from "react"
import { appContext } from "../../App"
import { useNavigate } from "react-router-dom"

const User = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (document.cookie.split('; ').find(row => row.startsWith('user='))?.split('=')[1]){
            navigate('/movies')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.username.value)
        if (window.confirm(`Proceed as ${e.target.username.value}?`)) {
            document.cookie = `user=${e.target.username.value}`
            document.cookie = 'test=testCookie'
            navigate('/movies')

        } 
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Enter username: </label>
            <input name='username' type="text" placeholder="username"/>
            <button type="submit">Set Username</button>
        </form>
    )
}

export default User