import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = error => reject(error);
  });
}

const ImageUploader  = ({setPreviewImage, setPreviewTitle}) => {
  const [fileList, setFileList] = useState([]);

  useEffect(async()=>{
    if (fileList[0] && !fileList[0].url && !fileList[0].preview) {
      fileList[0].preview = await getBase64(fileList[0].originFileObj);
    }
    fileList[0] && setPreviewImage(fileList[0].url || fileList[0].preview);
  },[fileList]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleChange = (info) => {
    if (info.fileList.length == 1){
      setFileList(info.fileList);
      fileList[0] && setPreviewTitle( fileList[0].name ||  fileList[0].url?.substring( fileList[0].url.lastIndexOf('/') + 1))
    }
  }

  const onUploadImage = async(file) => {
    const base64Image = await getBase64(file); 
    return new Promise((resolve) => resolve(base64Image || ''));
  }

  return (
    <>
        <div>
          <Upload
            action={onUploadImage}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}            
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
    </>
  );
}

export default ImageUploader;