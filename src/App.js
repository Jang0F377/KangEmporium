import {BrowserRouter as Router} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import MainComponent from "./components/MainComponent";
import {Provider} from 'react-redux'
import {store} from "./store";


function App() {
  return (
      <Provider store={store}>
          <div className='h-screen '>
              <Router>
                  <MainComponent/>
              </Router>
          </div>
      </Provider>


  );
}

export default App;
