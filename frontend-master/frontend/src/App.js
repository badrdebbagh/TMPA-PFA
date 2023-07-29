import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import jwt_decode from 'jwt-decode';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


import { setUser } from './redux/actions/authActions';
import store from './redux/store'
import { useSelector } from 'react-redux';
import PrivateRouter from './components/Private/PrivateRouter';
// ----------------------------------------------------------------------


export default function App() {
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
           
          <Router />
          
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
