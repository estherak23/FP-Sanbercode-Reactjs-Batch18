  
import React, {Component} from 'react';
import { Link, useHistory } from "react-router-dom"
import { UserContext } from '../userContext/userContext'
import axios from 'axios';
import { Button, Card, Tooltip } from 'antd';
const { Meta } = Card;

class Home extends Component {
    static contextType = UserContext
    
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            games: []
        }
    }
    
    changePage = () => {
        let history = useHistory()
        history.push("/")
    }    
    
    componentDidMount() {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res=> {
            let movies = res.data
            console.log(movies)
            this.setState({movies})
        })
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res=> {
            let games = res.data
            console.log(games)
            this.setState({games})
        })
    }

    render() {
        const user = this.context[0]
        return (
            <>
                <div className="header">
                    <h2>Welcome.</h2>
                    <h3>your guide to find best movie and game .</h3>
                </div>
                <section style={{margin: '2% 0 2% 2%'}}>
                    <h2 style={{fontWeight: 600, fontSize: '24px'}}>Movies Today</h2>
                    <div className="scroll">
                        {this.state.movies.map((item) => {
                            return (
                                    <Card
                                        style={{ minWidth: 150, maxWidth: 150 }}
                                        cover={
                                            <Link to={`/movie/${item.id}`}>
                                                <img alt="cover" src={item.image_url} width="150" height="225"/>
                                            </Link>
                                        }
                                        key={item.id}
                                    >
                                        <Meta title={
                                            <Tooltip title={item.title}>
                                                <Link to={`/movie/${item.id}`}>{item.title}</Link>
                                            </Tooltip>
                                            } 
                                            description={item.year} 
                                        />
                                    </Card>
                            )
                        })}
                    </div>
                    <h2 style={{marginTop: '2%', fontWeight: 600, fontSize: '24px'}}>Games Today</h2>
                    <div className="scroll">
                        {this.state.games.map((item) => {
                            return (
                                <Card
                                    style={{ minWidth: 150, maxWidth: 150 }}
                                    cover={
                                        <Link to={`game/${item.id}`}>
                                            <img alt="cover" src={item.image_url} width="150" height="225"/>
                                        </Link>
                                    }
                                    key={item.id}
                                >
                                    <Meta title={
                                        <Tooltip title={item.name}>
                                            <Link to={`game/${item.id}`}>{item.name}</Link>
                                        </Tooltip>
                                        } 
                                        description={item.release} 
                                    />
                                </Card>
                            )
                        })}
                    </div>
                    {
                        user === null && (
                            <div className="section">
                                <div>
                                    <h2>Join Now</h2>
                                    <h3>Get access to manage your own movie and game playlist.</h3>
                                    <div>
                                        <Button type="primary"><Link to="/register">Sign Up</Link></Button>  
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </section>
            </>
        )
    }
}

export default Home