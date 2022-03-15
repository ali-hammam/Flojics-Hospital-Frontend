import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import SignInRequest from '../../Requests/SignInRequest';
import UserRegistration from './UserRegistration';

const { TabPane } = Tabs;

const Registration = () =>{ 

  const [credentials, setCredentials] = useState({});
  const [isDataGived, setIsDataGivded] = useState(false);

  const signInRequest = SignInRequest.getInstance();
  const {mutate: sendData, error: errorResponse, data} = signInRequest.useCreateUser();
  
  useEffect(()=>{
      credentials !== {} && setIsDataGivded(true);
      isDataGived && sendData({user: credentials});
  }, [credentials])

  useEffect(()=>{
    data && console.log(data['data']['status'])
    data && data['data']['status'] == 200 && window.location.replace("http://localhost:3000/")
  }, [data])

  
  return(
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="User Registration" key="1">
        <UserRegistration 
          setCredentials={setCredentials} 
        />
      </TabPane>
    </Tabs> 
  )
};

export default Registration;