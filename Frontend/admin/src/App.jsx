// ** React
import { BrowserRouter, useNavigate } from "react-router-dom"

// ** React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "react-hot-toast";

// ** Context
import { AuthProvider } from "./context/AuthContext";

// ** MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// ** Components
import Router from "./router/Router"
import Layout from "./layout/Layout";


// theme
const theme = createTheme({
  direction: 'rtl'
});

// mui plugin
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function App() {

  const queryClient = new QueryClient();


  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff',
          },
        }} />
        <AuthProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Layout>
                <Router />
              </Layout>
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </BrowserRouter>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
