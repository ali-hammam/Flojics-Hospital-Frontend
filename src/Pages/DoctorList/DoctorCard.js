import { Button, Card, Row, Space } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import './DoctorList.css'
import {
  UserOutlined
} from '@ant-design/icons';

const DoctorCard = ({user, doctors, specializations}) => {
  const specializationIdMapper = specializations.reduce((accum, currentValue)=>{
    return {...accum, [currentValue['id']]: currentValue}
  },{})

  function valueFormat(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="site-card-border-less-wrapper"> 
      <Row style={{margin: '15px'}}>
        <Space dir='horizontal' size={15} className='card'>
          {
            doctors.map((doctor) => 
              <Card 
                title={<><UserOutlined /> {valueFormat(doctor['name'])}</>} 
                bordered={true} 
                style={{ width: 300 }} 
                key={doctor['id']}
              >
                <p>Specialization: <strong>{valueFormat(specializationIdMapper[doctor['specializtion_id']]['name'])}</strong></p>
                <p>Experience: <strong>{valueFormat(doctor['experience'])}</strong></p>
                <Space>
                  {  
                    user['is_admin'] == 1 && <Button type='primary'>
                      <Link to={`/doctor/${doctor['id']}/reservations`}>
                        Reservations
                      </Link>
                    </Button>
                  }

                  <Button type='primary'>
                    <Link to={`/doctor/${doctor['id']}/book`}>
                      Book
                    </Link>
                  </Button>
                </Space>
              </Card>
            )
          }
        </Space>
      </Row>
    </div>
  )
}

export default DoctorCard
