import React from 'react';
import { useRoutes } from 'react-router-dom';
import Registration from '../Pages/Registration';
import SignIn from '../Pages/SignIn';
import Home from '../Pages/Home';
import Agency from '../Pages/Agency';
import DoctorsList from '../Pages/DoctorList';
import ViewDoctor from '../Pages/DoctorList/ViewDoctor';
import BookDoctor from '../Pages/DoctorList/BookDoctor';

const LoggedInRoutes = ({loggedIn , user}) => {  
  let userRoutes =  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/doctors", element: <DoctorsList user={user}/> }
  ]);

  let ownerRoutes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/hospital", element: <Agency /> },
    { path: "/doctors", element: <DoctorsList user={user}/> },
    { path: "/doctor/:id/reservations", element: <ViewDoctor /> },
    { path: "/doctor/:id/book", element: <BookDoctor user={user}/> }
  ]);

  let unAuthorizedRoutes = useRoutes([
    { path: "/", element: <SignIn /> },
    { path: "/register", element: <Registration /> },
  ])

  let temp = user['is_admin'] === 0 ? userRoutes : ownerRoutes;

  return loggedIn ? temp : unAuthorizedRoutes;
}

export default LoggedInRoutes;