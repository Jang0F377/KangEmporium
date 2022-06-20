import {BrowserRouter as Router} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import MainComponent from "./components/MainComponent";


function App() {
  return (
      <div className='bg-gray-50 h-screen'>
          <Router>
              <MainComponent/>
          </Router>
      </div>

  );
}

export default App;
