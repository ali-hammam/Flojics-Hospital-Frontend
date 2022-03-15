import React from 'react'
import { Row, Col, Button, Form, Input } from 'antd';
import './registration.css';

const UserRegistration = ({setCredentials}) => {

  const onFinish = (values) => setCredentials({ ...values });
  
  return (
    <Form
      name="registration"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      style={{marginTop:'10%'}}
    >
      <Row>
        <Col xl={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Your name is required.',
              },
              {
                pattern: /^[a-zA-Z0-9 ]+$/,
                message: 'Name can only include letters and numbers.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      
        <Col xl={8}>
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
        </Col>

        <Col xl={8}>
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
            <Input.Password placeholder="password..."/>
          </Form.Item>
        </Col>
      </Row>
      
      <Row>
        <Col xl={8}>
          <Form.Item wrapperCol={{offset: 6}}>
            <Button type="primary" htmlType="submit" size='large'>
              Register
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default UserRegistration
