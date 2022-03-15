import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/NavBar';
import  LoggedInRoutes  from './routes';
import { Layout } from 'antd';
import SignInRequest from './Requests/SignInRequest';
import { get } from './Libraries/Storage'; 

const {  Footer } = Layout;

const  App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const signInRequest = SignInRequest.getInstance();
  const {data , isSuccess} = signInRequest.useUser();
  const [user , setUser] = useState({});

  useEffect(() => {
    if(loggedIn){
      setUser(data);
    }
  }, [isSuccess]);

  useEffect(()=>{
    isLoggedIn();
  },[])

  const isLoggedIn = () => {
    if(get('jwt') !== '' && get('jwt') != null){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }

  return(
    <ConfigProvider direction={'ltr'}>
      <BrowserRouter>
        {user && <Navbar loggedIn={loggedIn} user={user}/>}
        {user && <LoggedInRoutes loggedIn={loggedIn} user={user}/> }
      </BrowserRouter>
        <Footer 
          style={{ textAlign: 'center', position: 'fixed', bottom: '0', width: '100%' }}
        >
        Flojics Hospital Task WebSite ©2022 
        </Footer>
    </ConfigProvider>
  )
}

export default App;
