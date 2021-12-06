import { BrowserRouter, Switch, Route } from "react-router-dom";
// styles
import "./App.css";

// page components
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
