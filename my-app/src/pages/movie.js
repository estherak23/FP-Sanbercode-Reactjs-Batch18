import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom"
import axios from 'axios';
import { Layout, Image } from 'antd';
const { Content } = Layout;
// const { SubMenu } = Menu;

const Movies = () => {
    let {id} = useParams()    
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        if(movies == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(res=> {
                setMovies(res.data)
            })
        }
    }, [movies, setMovies])

    return(
        <>
            <Layout>
                <Content>
                { movies !== null && (
                    <>
                        <div className="movie-item">
                            <Image
                                width={300}
                                src={movies.image_url}
                                />
                            <div className="movie-detail">
                                <h1 style={{fontSize: '32px', fontWeight: 700, margin: 0}}>{movies.title}</h1>
                                <h2 style={{fontWeight: 600}}>{movies.year}</h2>
                                <p>{movies.description}</p>
                                <p>
                                    Review: <br/>
                                    {movies.review}
                                </p>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <div>
                                        <h3 style={{margin: 0}}>Genre</h3>
                                        <h4>{movies.genre}</h4>
                                    </div>
                                    <div>
                                        <h3 style={{margin: 0}}>Rating</h3>
                                        <h4>{movies.rating}</h4>
                                    </div>
                                    <div>
                                        <h3 style={{margin: 0}}>Duration</h3>
                                        <h4>{movies.duration}</h4>
                                    </div>  
                                </div>
                            </div>
                        </div>   
                    </>
                )}
                </Content>
            </Layout>
        </>
    )
}

export default Movies