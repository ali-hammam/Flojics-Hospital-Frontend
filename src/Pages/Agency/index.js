import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import Loader from '../../Components/Loader';
import SideBar from './SideBar';
import './agency.css';
import DoctorCrud from '../../Components/Forms/Doctor';


const Agency = () => {

  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div>
      <Loader renderSpinner={false}>
        <Row>
          <Col xl={5}>
            { 
              <div>
                { <SideBar setIsDoctor={setIsDoctor}/>}
              </div>
            }
          </Col>
          {!isDoctor &&
            <Col xl={19}>
              <div className='branch_description'>
                <h1 style={{disply:'flex', alignItems:'center'}}>Welcome To Your Medical Center</h1>
              </div>
            </Col>
          }

          {
            isDoctor &&
            <Col xl={19}>
              { <DoctorCrud /> }
            </Col>
          }
        </Row>
      </Loader>
    </div>
  )
}

export default Agency
