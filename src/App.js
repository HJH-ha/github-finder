import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import Alert from "./components/layout/Alert";
import { useState } from "react";
import User from "./pages/User";

function App() {
  const [alert, setAlert] = useState("");

  const handleAlert = (msg) => {
    setAlert(msg);
    //3초 뒤에 메세지 제거
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    // Routes 밖에있는 네브바랑 푸터는 계속 나오고 태그 안에있는건 페이지로 이동
    // 브라우저라우터 안에있는 주소는 Link to 사용가능, 이게 더 빠름
    <GithubProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar title="Github Finder" />
          <main className="container mx-auto px-3 pb-12">
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home handleAlert={handleAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
