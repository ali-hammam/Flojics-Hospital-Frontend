import React from 'react';
import { Button, Form, Input } from 'antd';

const SignInTemplate = ({setCredentials}) => {

  const onFinish = (values) => setCredentials({...values});

  return (
    <>
    {<Form
      name='login'
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      style={{marginTop:'10%'}}
    > 
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Your email is required.',
          },
          {
            pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            message: 'Email is wrong.',
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
            message: 'password is required.',
          }
        ]}
      >
        <Input.Password placeholder='password...' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset:6, span: 0 }}>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>}
    </>
  )
}

export default SignInTemplate
