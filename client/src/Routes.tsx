/**
 * All component routes
 */
import { Component } from 'solid-js';
import { Routes as Router, Route } from '@solidjs/router';
import Home from '@views/Home';
import About from '@views/About';
import PrivacyPolicy from '@views/PrivacyPolicy';
import Contact from '@views/Contact';

const Routes: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/contact" component={Contact} />
    </Router>
  );
};

export default Routes;
