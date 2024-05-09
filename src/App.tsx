import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from "react-router-dom";
import {SignIn, SignUp, Home, Movies, TVSeries} from "./pages";
import Header from "./components/Header";
import BookMarks from "./pages/BookMarks";
import {AppProvider} from "./context";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import Loader from "./components/Loader";
import "./reset.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const hideHeaderRoutes = ["/signin", "/signup"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (showHeader) {
      document.body.classList.remove("no-header");
    } else {
      document.body.classList.add("no-header");
    }
  }, [showHeader]);


  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const protectedRoutes = ["/", "/bookmarks","/movies","/tvseries"];
    if (protectedRoutes.includes(location.pathname) && !storedUser ) {
      return navigate('/signin');
    }
    if (!storedUser && location.pathname === "/signin") {
      return navigate('/signin');
    }
    if (!storedUser && location.pathname === "/signout") {
      return navigate('/signout');
    }


  }, [user, navigate]);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <>
      <AppProvider>
        {showHeader && <Header/>}
        <div className="main">
          <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/tvseries" element={<TVSeries/>}/>
            <Route path="/bookmarks" element={<BookMarks/>}/>
          </Routes>
        </div>
      </AppProvider>
    </>
  );
}

export default App;