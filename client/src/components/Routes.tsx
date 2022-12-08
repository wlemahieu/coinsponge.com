/**
 * All component routes
 */
import { Component } from 'solid-js';
import { Routes as Router, Route } from '@solidjs/router';
import Home from '@views/Home';

const Routes: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
};

export default Routes;
