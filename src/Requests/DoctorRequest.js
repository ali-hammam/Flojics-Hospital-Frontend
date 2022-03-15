import { useMutation, useQuery } from "react-query";
import ApiService from "./ApiService";

class DoctorRequest extends ApiService {
  static doctorService;
  
  useSpecializations = () => {
    return useQuery('specializations', () => {
      return this.get('/specializations');
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useAddDoctor = () => {
    return useMutation(( data ) => {
      return this.post('/addDoctor',  {data} );
    }, {
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  useEditDoctor = () => {
    return useMutation(( data ) => {
      return this.post('/editDoctor',  {data} );
    }, {
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  useDeleteDoctor = () => {
    return useMutation(( data ) => {
      return this.post('/deleteDoctor',  {data} );
    }, {
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  useDoctors = () => {
    return useQuery('getDoctors', () => {
      return this.get('/getDoctors');
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useAllDoctors = () => {
    return useQuery('getAllDoctors', () => {
      return this.get('/getAllDoctors');
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  useDoctorReservations = (id) => {
    return useQuery(`getDoctorReservations/${id}`, () => {
      return this.get(`/doctor/${id}/reservations`);
    }, {
      select: (response) => {
        const { data } = response;
        return data['data'];
      }
    });
  }

  static getInstance() {
    if (!DoctorRequest.doctorService)  {
      DoctorRequest.doctorService = new DoctorRequest();
    }

    return DoctorRequest.doctorService;
  }
}

export default DoctorRequest;