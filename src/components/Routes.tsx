/**
 * All component routes
 */
import { FC } from 'react';
import { Route, Routes as RouteSwitch } from 'react-router-dom';
import Home from '@src/views/Home';
import About from '@views/About';
import Terms from '@src/views/Terms';
import Privacy from '@src/views/Privacy';
import Cookies from '@src/views/Cookies';
import Contact from '@views/Contact';
import Login from '@src/views/Login';
import Verify from '@src/views/Verify';
import useGetFirebaseUser from '@src/hooks/useGetFirebaseUser';

const Routes: FC = () => {
  const user = useGetFirebaseUser();

  return (
    <RouteSwitch>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify" element={<Verify />} />
      {!user ? <Route path="/login" element={<Login />} /> : null}
    </RouteSwitch>
  );
};

export default Routes;
