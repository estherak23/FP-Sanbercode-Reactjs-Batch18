import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext/userContext';
import axios from 'axios';
import { Layout, Menu, Form, InputNumber, Input, Button } from 'antd';
const { Content, Sider } = Layout;

const GamesCreate = () => {
    const [user] = useContext(UserContext)

    const onFinish = values => {
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, 
        {
            name: values.name,
            genre: values.genre,
            singlePlayer: values.singlePlayer,
            multiplayer: values.multiplayer,
            platform: values.platform,
            release: values.release,
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
                            <Link to="/games-editor">Table Games</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            Add New Game
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                <h1 style={{padding: '16px 24px 0', fontSize: '24px', fontWeight: 600}}>Game Create</h1>
                    <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 16 } }>
                        <Form.Item label="Game Name">
                            <Form.Item
                                name="name"
                                noStyle
                                rules={[{ required: true, message: 'Game name is required' }]}
                            >
                            <Input style={{ width:'50%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Genre" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="genre"
                                rules={[{ required: true}]}
                                style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Single Player" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="singlePlayer"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: '20%' }}
                            >
                            <InputNumber />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item Layout="inline" label="Multiplayer" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="multiplayer"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: '20%' }}
                            >
                            <InputNumber />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Release" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="release"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: '20%' }}
                            >
                            <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Platform" style={{ marginBottom: 0 }}>
                            <Form.Item
                                name="platform"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: '50%' }}
                            >
                            <Input/>
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

export default GamesCreate