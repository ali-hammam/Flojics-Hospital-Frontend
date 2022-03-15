import { useMutation, useQuery } from "react-query";
import ApiService from "./ApiService";

class PatientRequest extends ApiService {
  static patientService;
  
  usePatientByName = () => {
    return useMutation(( data ) => {
      return this.post('/userByName',  {data} );
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useReserve = () => {
    return useMutation(( data ) => {
      return this.post('/reserve',  {data} );
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useDeleteReservation = () => {
    return useMutation(( id ) => {
      return this.delete(`/reservation/${id}`);
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useUpdateReservationAppointment = () => {
    return useMutation(( data ) => {
      return this.post(`/reservation/${data['id']}/update`, {data});
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  static getInstance() {
    if (!PatientRequest.patientService)  {
      PatientRequest.patientService = new PatientRequest();
    }

    return PatientRequest.patientService;
  }
}

export default PatientRequest;