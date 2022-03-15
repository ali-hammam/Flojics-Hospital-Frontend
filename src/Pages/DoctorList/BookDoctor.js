import { Button, Col, Form, Row, Select } from 'antd'
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import AppointmentPicker from '../../Components/Forms/Date';
import PatientRequest from '../../Requests/PatientRequest';

const{Option} = Select;

const BookDoctor = ({user}) => {
  const {id} = useParams();  
  const [formData, setFormData] = useState({});
  const patientRoutes = PatientRequest.getInstance();
  const {mutate:getUsersName, data} = patientRoutes.usePatientByName();
  const {mutate:reserve, data:isReserved} = patientRoutes.useReserve();
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState('');

  useEffect(()=>{
    getUsersName({patientName:patientName})
  }, [patientName]);

  useEffect(()=>{
    data && setPatients(data['data']['data'])
  }, [data]);

  useEffect(()=>{
    data && setPatients(data['data']['data'])
  }, [data]);

  useEffect(()=>{
    if(Object.keys(formData).length !== 0){
      formData && reserve(formData)
    }
  }, [formData]);

  useEffect(()=>{
    isReserved && isReserved['status'] == 200 && window.location.replace("http://localhost:3000/doctors");
  }, [isReserved]);

  const onPatientSearch = (value) => {
    setPatientName(value)
  }

  const onFinish = (values) =>{
    user['is_admin'] == 1 && setFormData({ 
      'user_id': values['user_id'],
      'doctor_id': parseInt(id),
      'appointment': (values['date'].format('YYYY-MM-DD') +' ' + values['time'].format('h:m:s'))
    })

    user['is_admin'] == 0 && setFormData({ 
      'user_id': user['id'],
      'doctor_id': parseInt(id),
      'appointment': (values['date'].format('YYYY-MM-DD') +' ' + values['time'].format('h:m:s'))
    })
  }

  return (
    <Form
      name="Book"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      style={{marginTop:'10%'}}
    >
      {
        user['is_admin'] == 1 && <Form.Item 
          label= 'Patient Name'
          name="user_id" 
          required 
          className="form-item body---14pt-R"
          rules={[
            { required: true, message: "Patient Name is required" }
          ]}
          hasFeedback
          shouldUpdate
        > 
          <Select
            showSearch
            size="large"
            placeholder='name'
            onSelect={onPatientSearch}
            onSearch={onPatientSearch}
            filterOption={false}
          >
            {
              patients && patients.map(patient => 
                <Option 
                  key={patient['id']} 
                  className='body---14pt-R'
                  value={patient['id']}
                >
                  {patient['name']}
                </Option>
              )
            }
          </Select>
        </Form.Item>
      }
        <AppointmentPicker />
      <Row>
        <Col xl={8}>
          <Form.Item wrapperCol={{offset: 18}}>
            <Button type="primary" htmlType="submit" size='large'>
              Reserve
            </Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}

export default BookDoctor