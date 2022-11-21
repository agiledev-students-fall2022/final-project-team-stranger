import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./Home.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import SendMessage from "./SendMessage.js";
import History from "./History";
import Stats from "./Stats.js";
import Settings from "./Settings.js";
import "./App.css";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#343a40",
      dark: "#212529",
      light: "#495057",
    },
    secondary: {
      main: "#adb5bd",
      dark: "#6c757d",
      light: "#ced4dA",
    },
    background: {
      main: "#e9ecef",
      dark: "#dee2e6",
      light: "#f8f9fa",
    },
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Header />
            <main className="App-main">
              <Routes>
                {/* Path for Home */}
                <Route path="/" element={<Home />}></Route>

                {/* Path to Sign In Page */}
                <Route path="/sign-in" element={<SignIn />}></Route>

                {/* Path to Sign Up */}
                <Route path="/sign-up" element={<SignUp />}></Route>

                {/* Path to Send Message Page */}
                <Route path="/send-message" element={<SendMessage />}></Route>

                {/* Path to Message History */}
                <Route path="/history" element={<History />}></Route>

                {/* Stats */}
                <Route path="/stats" element={<Stats />}></Route>

                {/* Stats Page */}
                <Route path="/settings" element={<Settings />}></Route>
              </Routes>
            </main>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
