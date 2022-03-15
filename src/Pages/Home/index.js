import React from 'react'
import { Row, Col } from 'antd';
import Doctor from '../../assets/doctor/Doctor';

import './home.css';

const Home = () => {
  return (
    <div className='home_body'>
      <Row className='align_row '>
        <Col xl={12}>
          <div className='description'>
            <h2>
              In our experience, healthcare delivery and marketing messaging are critically connected to meeting the needs of the individual.
              Marketing and advertising professionals have long recognized that, 
              according to Maslow’s Hierarchy, human behavior and decision-making are motivated by one of Maslow’s “
            </h2>
          </div>
        </Col>
        <Col xl={7}>
          <div className='car_icon'>
            <Doctor/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
