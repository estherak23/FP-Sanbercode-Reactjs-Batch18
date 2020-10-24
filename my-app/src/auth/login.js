import React, { useContext } from 'react'
import { UserContext } from '../userContext/userContext'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
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

const Login = () => {
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  
  const onFinish = (values) => {
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: values.email,
      password: values.password
    })
    .then(res => {
      const user = res.data.user
      const token = res.data.token
      const currentUser = {
        name: user.name,
        email: user.email,
        token
      }
      setUser(currentUser)
      localStorage.setItem("user", JSON.stringify(currentUser))
      history.push("/")
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
    <h1 style={{textAlign: 'center', margin: '24px ', fontSize: '24px'}}>Login to your account</h1>
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
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login