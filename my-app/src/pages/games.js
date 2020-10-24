import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom"
import axios from 'axios';
import { Layout, Image } from 'antd';
const { Content } = Layout;
// const { SubMenu } = Menu;

const Movies = () => {
    let {id} = useParams()    
    const [games, setGames] = useState(null)

    useEffect(() => {
        if(games == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res=> {
                setGames(res.data)
            })
        }
    }, [games, setGames])

    return(
        <>
            <Layout>
                <Content>
                { games !== null && (
                    <>
                        <div className="game-item">
                            <Image
                                width={300}
                                src={games.image_url}
                                />
                            <div className="game-detail">
                                <h1 style={{fontSize: '32px', fontWeight: 700, margin: 0}}>{games.name}</h1>
                                <h2 style={{fontWeight: 600}}>{games.release}</h2>
                                <h3>Playable on: {games.platform}</h3>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <div>
                                        <h3 style={{margin: 0}}>Genre</h3>
                                        <h4>{games.genre}</h4>
                                    </div>
                                    <div>
                                        <h3 style={{margin: 0}}>Single Player</h3>
                                        <h4>{games.singlePlayer}</h4>
                                    </div>
                                    <div>
                                        <h3 style={{margin: 0}}>Multiplayer</h3>
                                        <h4>{games.multiplayer}</h4>
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
