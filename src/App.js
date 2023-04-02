import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/shared/Nav";
import EditTask from "./components/home/EditTask";
import AddTask from "./components/home/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/addTask" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
