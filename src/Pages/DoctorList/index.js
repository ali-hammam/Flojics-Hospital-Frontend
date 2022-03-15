import { Input, Row, Col, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import DoctorRequest from '../../Requests/DoctorRequest';
import DoctorCard from './DoctorCard';
import Loader from '../../Components/Loader';
import './DoctorList.css'

const {Search} = Input;
const {Option} = Select;

const DoctorsList = ({user}) => {

  const specializationRequest = DoctorRequest.getInstance();
  const {data:specializations} = specializationRequest.useSpecializations();
  const {data:doctorsApi, isLoading, isSuccess:isDoctorsSuccess} = specializationRequest.useAllDoctors();
  const [searchType, setSearchType] = useState(-1);
  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{
    doctorsApi && setDoctors(doctorsApi);
  },[isDoctorsSuccess]);

  useEffect(()=>{
    doctorsApi && setDoctors(doctorsApi.filter((value) => value['specializtion_id'] == searchType));
  }, [searchType])

  const onSearchTypeChange = (value) => {
    setSearchType(value);
  }

  user && console.log(user);

  return (
    <>
      {
        <Row>
          <Col>
            <Select
              placeholder="Specialization"
              onChange={onSearchTypeChange}
              allowClear
            >
              {
                specializations && specializations.map((specialization) => 
                  <Option key={specialization['id']} value={specialization['id']}>
                    {specialization['name']}
                  </Option>
                )
              }
            </Select>
          </Col>
          <Col xl={7}>
            <Search placeholder="input search text"
              enterButton 
            />
          </Col>
        </Row>
      }

      
        <Loader renderSpinner={isLoading}>
          {specializations && doctors && <DoctorCard user={user} doctors={doctors} specializations={specializations}/>}
        </Loader>
      
    </>
  )
}

export default DoctorsList
