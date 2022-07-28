import { BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen bg-background-primary bg-main">
        <Router>
          <MainComponent />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
