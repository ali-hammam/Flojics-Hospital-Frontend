import { Form, Row, Col, Button, Select } from 'antd';
import React from 'react'

const DeleteDoctor = ({doctors, deleteDoctor }) => {
  const {Option} = Select;

  const onFinish = (value)=>{
    deleteDoctor(value);
  }

  return (
    <>
      <Form
      name="editDoctor"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      style={{marginTop:'2%'}}
    >
      <Row>
        <Col xl={8}>
          <Form.Item
            label="Doctor"
            name="doctor_id"
            rules={[
              {
                required: true,
                message: 'doctor is required.',
              }
            ]}
          >
            <Select
              placeholder="Select Doctor's Specialization"
              allowClear
            >
              {
                doctors.map((doctor)=>
                <>
                  <Option key={doctor['id']} value={doctor['id']}>
                    {doctor['name']}
                  </Option>
                </>
                )
              }
            </Select>
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item wrapperCol={{offset:'10'}}>
            <Button type="primary" htmlType="submit">
              Delete Doctor
            </Button>
        </Form.Item>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default DeleteDoctor
