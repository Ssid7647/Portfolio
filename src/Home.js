import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.js';
import Intro from './components/intro.js';
import Skills from './components/skills.js';
import Timelines from './components/timeline.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';
import { Projects } from './components/projects.js';
import { OrbitSpace } from 'orbit-space'
import Stack from 'react-bootstrap/Stack';



function App() {
  return (

    // <Stack gap={3} className="App">

    //   <Navbar />
    //   <OrbitSpace>
    //   <Intro />
    //   </OrbitSpace>

    //   <Skills />
    //   <Timelines />
    //   <Projects />
    //   <Contact />
    //   <Footer />
    // </Stack>
    <OrbitSpace >
      <Stack gap={3} className="">
        <Navbar />
        <Intro />
        <Skills />
        <Timelines />
        <Projects />
        <Contact />
        <Footer />
      </Stack>
    </OrbitSpace>

  );
}

export default App;
