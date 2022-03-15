import React, { useEffect, useState } from 'react';
import { Upload, Button, message, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserRequest from '../Requests/UserRequest';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = error => reject(error);
  });
}

const Test = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const userRequest = UserRequest.getInstance();
  const {mutate: sendData} = userRequest.useImageMutate();
  
  useEffect(()=>{
    data && sendData({image: data});
  }, [data])

  const props = {
    beforeUpload: file => {
      const isPNG = file.type.split('/')[0] === 'image';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },

    onChange: info => {
      info.fileList.splice(0, info.fileList.length-1);
      let formData = new FormData();
      formData.append("file", info.fileList);
      setImage(info.fileList)
      //console.log(info.fileList[0]['name'] + '/' + info.fileList[0]['uid']);
    }
  };

  const onFinish = (val) => {
    //let formData = new FormData();
    //setData(formData.append("file", image));
    //setImage(val);
    //let formData = new FormData();
    setData(image[0]);
  }

  const onUploadImage = async(file) => {
    const image = new Image();
    const base64Image = await getBase64(file); 
    base64Image && image.setNewPicture(base64Image);
    props.createImage(image);
    return new Promise((resolve) => resolve(base64Image || ''));
  }

  return (
    <div>
      <h1>Image</h1>
      <Form
        name='image'
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 0 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        style={{marginTop:'0'}}
      > 
        <Form.Item
          label="Image"
          name="image"
          /*rules={[
            {
              required: true,
              message: 'Image should uploaded.',
            },
          ]}*/
        >
          <Upload 
            {...props}
            listType="picture"
            className="upload-list-inline"
            action={onUploadImage}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset:6, span: 0 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default Test;
