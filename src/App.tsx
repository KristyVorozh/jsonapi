import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
