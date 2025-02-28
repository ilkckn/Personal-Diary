import Home from "./pages/Home"
import SplashScreen from "./components/SplashScreen"
import "./App.css"

function App() {

  return (
    <div className="appContainer w-full min-h-[100vh]">
      <SplashScreen />
      <Home />
    </div>
  )
}

export default App
