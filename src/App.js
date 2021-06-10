import "./Styles/style.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Dashboard } from "./Pages/Management/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Homepage}></Route>

          {localStorage.getItem("authentication") != null ? (
            <Route path="/dashboard" component={Dashboard}></Route>
          ) : (
            <Route path="/" exact component={Homepage}></Route>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
