import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Intro from './components/intro';
import Skills from './components/skills';
import Timelines from './components/timeline';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import { Projects } from './components/projects';
import Stack from 'react-bootstrap/Stack';
import { OrbitSpace } from 'orbit-space'


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
