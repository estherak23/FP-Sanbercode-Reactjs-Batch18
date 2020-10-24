import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';
import { Table, Layout, Menu, Image, Space, Button, BackTop, Popconfirm} from 'antd';
import axios from 'axios';
const { Content, Sider } = Layout;
// const { SubMenu } = Menu;

const GamesEditor = () => {
    const [dataGame, setDataGame] = useState(null)
    const [user] = useContext(UserContext)
    const [search, setSearch] = useState("")
    
    useEffect(() => {      
        if(dataGame == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setDataGame(res.data)
            })
        }
    }, [dataGame])

    const handleDelete = (key) => {
        var idGame = parseInt(key)
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, {headers: {"Authorization" : `Bearer ${user.token}`}} )
        .then(res => {
          const newDataGame = dataGame.filter(x=> x.id !== idGame)
          setDataGame(newDataGame)
        })
    }

    const submitSearch = (e) =>{
        e.preventDefault()
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res => {
          let resGames = res.data
          let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
          setDataGame([...filteredGames])
        })
     
      }
    
      const handleChangeSearch = (e)=>{
        setSearch(e.target.value)
      }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image_url',
            render: theImageURL => <Image width={150} height={225} alt={theImageURL} src={theImageURL}/> 
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirection: ['descend'],
            ellipsis: true,
        },
        {
            title: 'Year',
            dataIndex: 'release',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.release- b.release,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            sorter: (a, b) => a.platform.localeCompare(b.platform),
        },
        {
            title: 'Action',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <Button  type="primary">Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => {handleDelete(record.id)}}>
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    
    return(
        <>
            <Layout style={{}}>
                <Sider style={{backgroundColor: 'white', borderRight: 'solid 1px #e8e8e8', paddingTop: '16px'}}>
                    <Menu defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            Table Games
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/games-create">Add New Game</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <h1 style={{padding: '16px 24px 0', fontSize: '24px', fontWeight: 600}}>Game Table</h1>
                    <form onSubmit={submitSearch} style={{textAlign: 'center'}}>
                        <input type="text" value={search} onChange={handleChangeSearch} />
                        <button>Search</button>
                    </form>
                    <Table style={{padding: '8px 24px'}} columns={columns} dataSource={dataGame}/>
                </Content>
                <BackTop>
                    <div className="backTop">UP</div>
                </BackTop>
            </Layout>
        </>
    )
}

export default GamesEditor