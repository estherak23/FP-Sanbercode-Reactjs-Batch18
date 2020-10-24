import React, { useContext }  from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';
import axios from 'axios'
import { Layout, Menu, Form, Input, Button, InputNumber } from 'antd';
const { Content, Sider } = Layout;
// const { SubMenu } = Menu;

const MoviesCreate = () => {
    const [user] = useContext(UserContext)

    const onFinish = values => {
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, 
        {
            title: values.title,
            description: values.description,
            year: values.year,
            duration: values.duration,
            genre: values.genre,    
            rating: values.rating,
            review: values.review,
            image_url: values.image_url
        }, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            alert("Input Success!")
        }).catch(
            (err)=>{
                alert(err)
            }
        )
    }
    
    return(
        <>
            <Layout>
                <Sider style={{backgroundColor: 'white', borderRight: 'solid 1px #e8e8e8', paddingTop: '16px'}}>
                    <Menu defaultSelectedKeys={['2']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/movies-editor">Table Movies</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            Add New Movie
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <h1 style={{padding: '16px 24px 0', fontSize: '24px', fontWeight: 600}}>Movie Create</h1>
                    <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 16 } }>
                        <Form.Item label="Movie Title">
                            <Form.Item
                            name="title"
                            noStyle
                            rules={[{ required: true, message: 'Movie title is required' }]}
                            >
                            <Input style={{ width:'50%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Description" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="description"
                            rules={[{ required: true}]}
                            style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input.TextArea />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Year" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="year"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '20%' }}
                            >
                            <InputNumber />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item Layout="inline" label="Duration" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="duration"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '20%' }}
                            >
                            <InputNumber />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Rating" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="rating"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '20%' }}
                            >
                            <InputNumber min={0} max={10} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Genre" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="genre"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Review" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="review"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input.TextArea/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Image Url" style={{ marginBottom: 0 }}>
                            <Form.Item
                            name="image_url"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input.TextArea/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}

export default MoviesCreate