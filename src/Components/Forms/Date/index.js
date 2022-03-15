import { DatePicker, Form } from 'antd';
import React from 'react';
import moment from 'moment';


const AppointmentPicker = () => {
  return (
    <>
      <Form.Item
        label="Appointment"
        name="date"
        rules={[
          {
            required: true,
            message: 'From Time is required.',
          }
        ]}
      >
        <DatePicker 
          disabledDate={d => !d || d.isAfter(moment().add(1, 'M')) || d.isSameOrBefore(moment()) } 
          format="YYYY-MM-DD" 
          defaultPickerValue={moment().endOf('month')} 
          placeholder="Select date" 
        />
    </Form.Item>

    <Form.Item
      wrapperCol={{offset:'6'}}
      name="time"
      rules={[
        {
          required: true,
          message: 'Time is required.',
        }
      ]}
    >
      <DatePicker picker='time'/>

    </Form.Item>
  </>
  )
}

export default AppointmentPicker