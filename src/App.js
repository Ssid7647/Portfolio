// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Transliteration from "./components/transliteration/index.js"
import Segmentation from "./components/segmentation/index.js"
// import About from './Pages/About';
// import Products from './Pages/Products';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Segmentation" element={<Segmentation />} />
            <Route path="/Transliteration" element={<Transliteration/>} />
         </Routes>
      </>
   );
};
 
export default App;