import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Vision from './pages/Vision';
import Mision from './pages/Mision';
import Gallery from './pages/Gallery';
import Contactus from './pages/Contactus';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import SliderImageUploader from './components-new/SliderImageUploader';
import Ourstory from './pages/Ourstory';
import AboutTrust from './pages/AboutTrust';
import Services from './pages/Services';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<Aboutus/>} />
        <Route path='/vision' element={<Vision />} />
        <Route path='/mision' element={<Mision />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/ourstory' element={<Ourstory />} />
        <Route path='/abouttrust' element={<AboutTrust />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/Services' element={<Services />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/slider-image' element={<SliderImageUploader/>}/>          
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
