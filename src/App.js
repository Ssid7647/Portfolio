// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Transliteration from "./components/transliteration/index.js"
import Segmentation from "./components/segmentation/index.js"
// import About from './Pages/About';
// import Products from './Pages/Products';

const App = () => {
   return (


      <Routes>
      
         <Route path="/Portfolio" element={<Home />} />
         <Route path="/Portfolio/Segmentation" element={<Segmentation />} />
         <Route path="/Portfolio/Transliteration" element={<Transliteration />} />
      </Routes>


   );
};

export default App;