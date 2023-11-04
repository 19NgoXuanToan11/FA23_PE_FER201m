import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPlayers from "./components/AllPlayers";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                
                <Routes>
                    <Route path="/" element={<AllPlayers/>} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
