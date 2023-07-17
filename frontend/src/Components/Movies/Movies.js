import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../../App"
import { useNavigate } from "react-router-dom"

const Movies = () => {
    const navigate = useNavigate()
    const [ movies, setMovies ] = useState([])
    const [ watched, setWatched ] = useState([])
    const [ display, setDisplay ] = useState([])
    const [ update, setUpdate ] = useState()

    useEffect(() => {
        
        if (!document.cookie.split('; ').find(row => row.startsWith('user='))?.split('=')[1]) {
            navigate('/')
        }
        fetch('http://localhost:3001/movies')
            .then(res => res.json())
            .then(data => {
                setMovies(data)
                setDisplay(data)
            })
    }, [update])

    const handleChange = (e) => {
        setDisplay(movies.filter(movie => movie.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const addMovie = (e) => {
        e.preventDefault()
        let title = e.target.title.value
        fetch('http://localhost:3001/movies', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"title": title})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUpdate(!update)
            })
    }

    const delMovie = (movie) => {
        fetch('http://localhost:3001/movies', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"title": movie.title})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUpdate(!update)
            })
    }

    const handleSvg = (movie) => {
        if (watched.includes(movie)) {
            // let temp = watched.filter(title => title !== movie.title)
            // setWatched(temp)
            return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="24" fill="currentColor"><path d="M10 12c-5.042.007-10-2.686-10-6S4.984-.017 10 0c5.016.017 10 2.686 10 6s-4.958 5.993-10 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg>)
        } else {
            // setWatched([...watched, movie.title])
            return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414L11.885 9.33a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6 .914.003 1.827.094 2.709.262z"></path></svg>)
        }
    }

    const handleWatched = (movie) => {
        console.log(watched)
        if (watched.includes(movie)) {
            setWatched(watched.filter(mov => mov.title !== movie.title))
        } else {
            setWatched([...watched, movie])
        }
    }


    return (
        <>
            <form onSubmit={addMovie} className="addMovie">
                <p>Add New Movie</p>
                <label htmlFor='title'>Title: </label>
                <input type="text" placeholder="Title" name="title"/>
                <button type="submit">Add</button>
            </form>
            <input type="search" onChange={handleChange} placeholder="search title"/><br></br>
            <button onClick={() => {let toShow = movies.filter(mov => !watched.includes(mov)); setDisplay(toShow)}}>To Watch</button><button onClick={() => setDisplay([...watched])}>Watched</button>
            {display?.map(movie => <p key={movie.id}><span onClick={() => handleWatched(movie)}>{handleSvg(movie)}</span>{movie.title}<svg onClick={() => delMovie(movie)} xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" width="24" fill="currentColor"><path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path></svg></p>)}
            
        </>
    )
}

export default Movies