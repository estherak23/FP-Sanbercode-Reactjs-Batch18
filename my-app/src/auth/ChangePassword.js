import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
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

const ChangePassword = () => {
    const [user] = useContext(UserContext)
    let history = useHistory()
    
    const onFinish = (values) => {
      // {current_password: "qwertyu", new_password: "dfgh", new_confirm_password: ".kjhn"}
      console.log(user)
        console.log('Success:', values)
        if(values.new_password !== values.new_confirm_password) {
          alert("Passwords don't match");
        } else {
          axios.post(`https://backendexample.sanbersy.com/api/change-password`, 
            {
              current_password: values.current_password, 
              new_password: values.new_password, 
              new_confirm_password: values.new_confirm_password
            },
            {
              headers: {
                "Authorization" : `Bearer ${user.token}`
              }
            })
          .then(res => {
            alert("Success!")
            history.push("/")
          })
          .catch(err => {
            alert(err)
          })
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

  return (
    <>
      <h1 style={{textAlign: 'center', margin: '24px '}}>Change Password</h1>
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
          label="Old Password"
          name="current_password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="new_password"
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="new_confirm_password"
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Link to="/" style={{marginLeft: '8px'}}> Cancel</Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default ChangePassword