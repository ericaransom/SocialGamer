import "./App.css";

import "./index.css";
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/notfound" element={<NotFound />}/>
      </Routes>
    </Router>
    <h1> We have set the project structure</h1>
</div>
  );
}

export default App;
