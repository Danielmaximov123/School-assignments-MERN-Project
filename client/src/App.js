import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";
import MainPageComp from './Main Page';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  direction: 'rtl',  // Both here and <body dir="rtl">
  typography: {
    fontFamily: [
      'Heebo',
      'sans-serif'
    ].join(','),
  }
  
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

const App = () => {

  return (
    <div>
      <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
      <ToastContainer autoClose={2000} rtl/>
      <CssBaseline />
        <div dir="rtl" style={{fontFamily : 'Heebo' , direction : 'rtl'}}>
        <MainPageComp/>
        </div>
      </ThemeProvider>
        </CacheProvider>
    </div>
  )
}

export default App