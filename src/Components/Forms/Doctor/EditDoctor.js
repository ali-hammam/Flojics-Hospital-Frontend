import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Select, Input } from 'antd';


const {Option} = Select;
const { TextArea } = Input;

const EditDoctor = ({doctors, specializations, update}) => {
  const [field, setField] = useState('');
  const fields = [
    'name',
    'specialization',
    'experience'
  ];

  const onFieldChange = (value) => {
    setField(value);
  }

  const onFinish = (values)=>{
    update(values);
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
          <Form.Item
            label="Field"
            name="field"
            rules={[
              {
                required: true,
                message: 'Field is required.',
              },
            ]}
          >
            <Select
              placeholder="Select The Field"
              allowClear
              onChange={onFieldChange}
            >
              {
                fields.map((field, index)=>
                  <>
                    <Option key={index} value={field}>
                      {field}
                    </Option>
                  </>
                )
              }
            </Select>
          </Form.Item>

        </Col>

        {
          field=='experience' && <Col xl={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                {
                  required: true,
                  message: 'Experience is required.',
                }
              ]}
            >
              <TextArea showCount maxLength={100} />
            </Form.Item>
        </Col>
        }

        {
          field=='name' && <Col xl={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Name is required.',
                }
              ]}
            >
              <Input />
            </Form.Item>
        </Col>
        }

        {
          field == 'specialization' && <Col xl={8}>
            <Form.Item
              label="Specialization"
              name="specializtion_id"
              rules={[
                {
                  required: true,
                  message: 'Experience is required.',
                }
              ]}
            >
              <Select 
                placeholder="Select The Field"
                allowClear
              >
                {
                  specializations.map((specialization)=>
                    <>
                      <Option key={specialization['id']} value={specialization['id']}>
                        {specialization['name']}
                      </Option>
                    </>
                  )
                }
              </Select>
            </Form.Item>
        </Col>
        }
      </Row>

      <Row>
        <Form.Item wrapperCol={{offset:'10'}}>
          <Button type="primary" htmlType="submit">
            Edit Doctor
          </Button>
        </Form.Item>
      </Row>
    </Form>
    </>
  )
}

export default EditDoctor
