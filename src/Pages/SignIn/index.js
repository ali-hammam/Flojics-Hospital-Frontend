import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import SignInRequest from '../../Requests/SignInRequest';
import { add } from '../../Libraries/Storage';

import SignInTemplate from './SignInTemplate';

const { TabPane } = Tabs;

const SignIn = () => {
    
  const [credentials, setCredentials] = useState({});
  const signInRequest = SignInRequest.getInstance();
  const {mutate: sendData, data, isSuccess} = signInRequest.useLoginUser();

  useEffect(()=>{
    sendData({user: credentials});
  }, [credentials])

  useEffect(()=>{
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    if(data && data['data']['message'] != 'invalid credentials'){
      const token = data['data']['message'];
      document.cookie = `jwt=${token}; expires=${now.toUTCString()}`;
      add('jwt' , token);
      document.location.reload();
    }
  }, [isSuccess])

  return(
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="User Sign In" key="1">
        <SignInTemplate setCredentials={setCredentials} />
      </TabPane>
    </Tabs> 
  )
};

export default SignIn;