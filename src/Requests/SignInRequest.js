import { useMutation, useQuery } from "react-query";
import ApiService from "./ApiService";

class SignInRequest extends ApiService {
  static signInService;

  useUser = () => {
    return useQuery('user', () => {
      return this.get('/user');
    }, {
      select: (response) => {
        const { data } = response;
        return data['user'];
      }
    });
  }

  useLoginUser = () => {
    return useMutation(({ user }) => {
      const data = user;
      return this.post('/login',  {data} );
    }, {
      retry: false,
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  useLogout = () => {
    return useMutation(() => {
      return this.post('/logout');
    }, {
      retry: false,
    });
  }

  useCreateUser = () => {
    return useMutation(({ user }) => {
      const data = user;
      console.log(data);
      return this.post('/register',  {data} );
    }, {
      retry: false,
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  static getInstance() {
    if (!SignInRequest.signInService)  {
      SignInRequest.signInService = new SignInRequest();
    }

    return SignInRequest.signInService;
  }
}

export default SignInRequest;