import React from 'react'
import { Collapse } from 'antd';
import DoctorRequest from '../../../Requests/DoctorRequest';
import AddDoctor from './AddDoctor';
import EditDoctor from './EditDoctor';
import DeleteDoctor from './DeleteDoctor';

const { Panel } = Collapse;

const DoctorCrud = () => {
  const specializationRequest = DoctorRequest.getInstance();
  const {data:specializations} = specializationRequest.useSpecializations();
  const {data:doctors} = specializationRequest.useDoctors();
  const {data:isCreated , mutate: sendDataToCreate} = specializationRequest.useAddDoctor();
  const {data:isUpdated , mutate: sendDataToUpdate} = specializationRequest.useEditDoctor();
  const {data:isDeleted , mutate: sendDataToDelete} = specializationRequest.useDeleteDoctor();



  return (
    <Collapse accordion>
      <Panel header="Add New Doctor" key="5">
        {isCreated &&  window.location.replace("http://localhost:3000/hospital")}
        { specializations && <AddDoctor create={sendDataToCreate} specializations={specializations}/> }
      </Panel>

      <Panel header="Edit Doctor" key="6">
        {isUpdated &&  window.location.replace("http://localhost:3000/hospital") }
        {doctors && specializations && <EditDoctor doctors={doctors} specializations={specializations} update={sendDataToUpdate}/>}
      </Panel>

      <Panel header="Delete Doctor" key="7">
        {isDeleted &&  window.location.replace("http://localhost:3000/hospital") }
        {doctors && specializations && <DeleteDoctor doctors={doctors} deleteDoctor={sendDataToDelete}/>}
      </Panel>

    </Collapse>
  )
}

export default DoctorCrud
