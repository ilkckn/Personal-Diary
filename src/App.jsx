import "./App.css";
import EntryModal from "./components/EntryModal";
import EntryContextProvider from "./context/EntryContext";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <EntryContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entry/:id" element={<EntryModal />} />
        </Routes>
      </div>
    </EntryContextProvider>
  );
}

export default App;
