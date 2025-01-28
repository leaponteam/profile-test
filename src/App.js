import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
