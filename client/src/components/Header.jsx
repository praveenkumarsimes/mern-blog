import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import customFetch from '../api';
import logo from '../../images/logo.png';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await customFetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        localStorage.removeItem('token');
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-' style={{height:"auto",background:"#367d83", padding:"1px"}}>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <img src={logo} alt='Logo' style={{height:"75px"}}/>
      </Link>
      {/* <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form> */}
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
        className='w-12 h-10 hidden sm:inline'
        color='gray'
        pill
        onClick={() => dispatch(toggleTheme())} >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}
            style={{ minWidth: '200px', background: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/' className="text-lg text-black dark:text-white">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/vision'} as={'div'}>
          <Link to='/vision' className="text-lg text-black dark:text-white">Vision</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/mision'} as={'div'}>
          <Link to='/mision' className="text-lg text-black dark:text-white">Mision</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/gallery'} as={'div'}>
          <Link to='/gallery' className="text-lg text-black dark:text-white">Gallery</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/services'} as={'div'}>
          <Link to='/services' className="text-lg text-black dark:text-white">Services</Link>
        </Navbar.Link>
        <Dropdown inline className="text-lg text-black dark:text-white" label="About US">
        <Dropdown.Item href='/aboutus'>About US</Dropdown.Item>
          <Dropdown.Item href='/Ourstory'>Our Story</Dropdown.Item>
          <Dropdown.Item href='/AboutTrust'>About Trust</Dropdown.Item>
          {/* <Dropdown.Divider />
          <Dropdown.Item href="#action/3.4">
            Separated link
          </Dropdown.Item> */}
        </Dropdown>
        <Navbar.Link active={path === '/contacts'} as={'div'}>
          <Link to='/contacts'  className="text-lg text-black dark:text-white">Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
