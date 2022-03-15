import React,{useState, useEffect} from 'react'
import DoctorRequest from '../../Requests/DoctorRequest';
import { useParams } from "react-router";
import Loader from '../../Components/Loader';
import { Form, Modal, Table, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import PatientRequest from '../../Requests/PatientRequest';
import AppointmentPicker from '../../Components/Forms/Date';

const ViewDoctor = () => {
  const {id} = useParams();  
  const [reservationId, setReservationId] = useState(-1);
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(false);

  const specializationRequest = DoctorRequest.getInstance();
  const reservationRequest = PatientRequest.getInstance();

  const {data:reservationsApi, isLoading} = specializationRequest.useDoctorReservations(id);
  const {data:isReservationDeleted, mutate:deleteReservation} = reservationRequest.useDeleteReservation();
  const {data:isReservationUpdated, mutate:updateReservation} = reservationRequest.useUpdateReservationAppointment();

  useEffect(()=>{
    isReservationDeleted && isReservationDeleted['status'] == 200 && setReservations(reservations.filter((reservation)=>{
      return reservation['id'] !== reservationId
    }))
    
  }, [isReservationDeleted,reservationId ]);

  useEffect(()=>{
    setReservations(reservationsApi)
  }, [reservationsApi]);

  useEffect(()=>{
    formData && updateReservation(formData);
  }, [formData]);

  useEffect(() => {
    isReservationUpdated && isReservationUpdated['status'] == 200 && setReservations(reservations.map((reservation)=>{
      if(reservation['id'] == formData['id']){
        reservation = {...reservation, 'appointment': formData['appointment']}
      }
      return {...reservation};
    }))
  }, [isReservationUpdated])


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => 
        <div className="body---14pt-R table-body-content">
          {record['user']['name']}
        </div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => 
        <div className="body---14pt-R table-body-content">
          {record['user']['email']}
        </div>
    },
    {
      title: 'Appointment',
      dataIndex: 'appointment',
      key: 'appointment',
    },
    {
      title: 'Edit Appointment',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => 
        <>
          <EditOutlined onClick={() => onEditAppointment(record) }/>
          <DeleteOutlined onClick={()=> onDeleteAppointment(record)} style={{color:'red', marginLeft:12}}/>
        </>
    }
  ];

  const onDeleteAppointment = (record) => {
    setReservationId(record['id']);
    deleteReservation(record['id'])
  }

  const onEditAppointment = (record) => {
    setReservationId(record['id']);
    setIsEditing(true);
  }

  const onEditFinish = (values) => {
    setFormData({
      'id': reservationId,
      'appointment': (values['date'].format('YYYY-MM-DD') +' ' + values['time'].format('h:m:s'))
    });

    setIsEditing(false)
  }

  return (
    <>
      <h1 style={{textAlign:'center'}}>Reservations</h1>
      <Loader renderSpinner={isLoading}>
        {
          reservations && <Table dataSource={reservations} columns={columns} />
        }
        <Form
          name="editAppointment"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onEditFinish}
          style={{marginTop:'10%'}}
        >
          <Modal
            title="Edit Appointment"
            visible={isEditing}
            okText="Save"
            onCancel={()=> setIsEditing(false)}
            onOk={()=> setIsEditing(false)}
            footer={[
            <Button form="editAppointment" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
          >
            <AppointmentPicker />
          </Modal>
        </Form>
      </Loader>
    </>
  )
}

export default ViewDoctor