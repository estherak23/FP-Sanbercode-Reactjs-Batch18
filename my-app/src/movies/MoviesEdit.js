import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';
import axios from 'axios';
import { Table, Layout, Menu, Image, Space, Button, BackTop, Popconfirm} from 'antd';
const { Content, Sider } = Layout;
// const { SubMenu } = Menu;

const MoviesEditor = () => {
    const [dataMovie, setDataMovie] = useState(null)
    const [user] = useContext(UserContext)
    const [search, setSearch] = useState("")
    
    useEffect(() => {      
        if(dataMovie == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                setDataMovie(res.data)
                console.log(res.data)
            })
        }
    }, [dataMovie])

    const handleDelete = (key) => {
        console.log(key)
        var idMovie = parseInt(key)
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, {headers: {"Authorization" : `Bearer ${user.token}`}} )
        .then(res => {
          const newDataMovie = dataMovie.filter(x=> x.id !== idMovie)
          setDataMovie(newDataMovie)
        })
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image_url',
            render: theImageURL => <Image width={150} height={225} alt={theImageURL} src={theImageURL}/> 
        },
        {
            title: 'Name',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirection: ['descend'],
            ellipsis: true,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.year- b.year,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: (a, b) => a.genre.localeCompare(b.genre),
            sortDirection: ['descend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
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

    const submitSearch = (e) =>{
        e.preventDefault()
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res => {
          let resMovies = res.data
          let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
          setDataMovie([...filteredMovies])
        })
     
      }
    
      const handleChangeSearch = (e)=>{
        setSearch(e.target.value)
      }
    
    
    return(
        <>
            <Layout>
                <Sider style={{backgroundColor: 'white', borderRight: 'solid 1px #e8e8e8', paddingTop: '16px'}}>
                    <Menu defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            Table Movies
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/movies-create">Add New Movie</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <h1 style={{padding: '16px 24px 0', fontSize: '24px', fontWeight: 600}}>Movie Table</h1>
                    <form onSubmit={submitSearch} style={{textAlign: 'center'}}>
                        <input type="text" value={search} onChange={handleChangeSearch} />
                        <button>Search</button>
                    </form>
                    <Table style={{padding: '8px 24px'}} columns={columns} dataSource={dataMovie}/>
                </Content>
                <BackTop>
                    <div className="backTop">UP</div>
                </BackTop>
            </Layout>
        </>
    )
}

export default MoviesEditor