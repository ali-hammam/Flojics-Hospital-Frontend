import React, { useState } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd';
import ImageUploader from '../../GeneralComponents/ImageUploader';

const {Option} = Select;
const { TextArea } = Input;

const AddDoctor = ({create, specializations}) => {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  
  const onFinish = (values) => {
    create({...values});
  }

  return (
    <Form
      name="addDoctor"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'name is required.',
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={8}>
          <Form.Item
            label="Specialization"
            name="specializtion_id"
            rules={[
              {
                required: true,
                message: 'Specialization is required.',
              },
            ]}
          >
            <Select
              placeholder="Select Doctor's Specialization"
              allowClear
            >
              {
                specializations && specializations.map((specialization)=>
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

        <Col xl={8}>
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
      </Row>

      <Row>
        <Col xl={8}>
          <Form.Item
            label="Image"
            name="image"
          >
            <ImageUploader setPreviewImage={setPreviewImage} setPreviewTitle={setPreviewTitle}/>
          </Form.Item>
        </Col>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Doctor
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default AddDoctor
