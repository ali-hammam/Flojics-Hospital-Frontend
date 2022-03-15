import { useMutation } from "react-query";
import ApiService from "./ApiService";

class UserRequest extends ApiService {
  static userService;

  useImageMutate = () => {
    return useMutation(({ image }) => {
      console.log(image);
      return this.post('/addImage',  {data: {image} } );
    }, {
      select: (response) => {
        const { data } = response;
        return data;
      }
    });
  }

  static getInstance() {
    if (!UserRequest.userService)  {
      UserRequest.userService = new UserRequest();
    }

    return UserRequest.userService;
  }
}

export default UserRequest;