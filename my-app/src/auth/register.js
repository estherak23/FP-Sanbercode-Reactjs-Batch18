import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserContext } from '../userContext/userContext';
import axios from 'axios'

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
};

const tailLayout = {
    wrapperCol: {
      offset: 8
    },
};

const Register = () => {
  const [,setUser] = useContext(UserContext)

  const onFinish = (values) => {
    // console.log('Success:', values.email);
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: values.name,
      email: values.email,
      password: values.password
    })
    .then(res => {
      console.log(res)
      const user = res.data.user
      const token = res.data.token
      const currentUser = { 
        name: user.name, 
        email: user.email, 
        token 
      }
      setUser(currentUser)
      localStorage.setItem("user", JSON.stringify(currentUser))
    })
    .catch(err => {
      alert(err)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1 style={{textAlign: 'center', margin: '24px '}}>Sign up for an account</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <Link to="/" style={{marginLeft: '8px'}}> Cancel</Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default Register