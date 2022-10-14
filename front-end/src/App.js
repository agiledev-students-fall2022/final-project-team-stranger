import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./Home.js"; 
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Profile from "./Profile";
import SendMessage from "./SendMessage.js";
import History from "./History";
import Stats from "./Stats.js";
import Settings from "./Settings.js";
import "./App.css"

function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <main className='App-main'>
          <Routes>

            {/* Path for Home */}
            <Route path="/" element={<Home/>}></Route>

            {/* Path to Sign In Page */}
            <Route path="/sign-in" element={<SignIn/>}></Route>

            {/* Path to Sign Up */}
            <Route path="/sign-up" element={<SignUp/>}></Route>

            {/* Path to Profile Page */}
            <Route path='/profile' element={<Profile/>}></Route>

            {/* Path to Send Message Page */}
            <Route path='/send-message' element={<SendMessage/>}></Route>

            {/* Path to Message History */}
            <Route path="/history" element={<History/>}></Route>

            {/* Stats */}
            <Route path="/stats" element={<Stats/>}></Route>
           
            {/* Stats Page */}
            <Route path='/settings' element={<Settings/>}></Route>

          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}


export default App; 