import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import HomepageAfterSignUpOrLogi from "./pages/HomepageAfterSignUpOrLogi";
import LoginPage from "./pages/LoginPage";
import MoodTrackerCase from "./pages/MoodTrackerCase";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/sign-up":
        title = "";
        metaDescription = "";
        break;
      case "/homepage-after-sign-up-or-login":
        title = "";
        metaDescription = "";
        break;
      case "/login-page":
        title = "";
        metaDescription = "";
        break;
      case "/mood-tracker-case-1":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/homepage-after-sign-up-or-login"
        element={<HomepageAfterSignUpOrLogi />}
      />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/mood-tracker-case-1" element={<MoodTrackerCase />} />
    </Routes>
  );
}
export default App;
