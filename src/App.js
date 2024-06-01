import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LeftDrawer from "./Layouts/Drawer";
import Header from "./Layouts/Header";
import Users from "./Pages/Users";
import Programs from "./Pages/Programs";
import Events from "./Pages/Events";
import Newsletters from "./Pages/Newsletters";
import Podcasts from "./Pages/Podcasts";
import Notifications from "./Pages/Notification";

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Header setOpen={setOpen} />
        <LeftDrawer setOpen={setOpen} open={open} />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/*" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
