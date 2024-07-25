import Router from "./router/Router"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


const theme = createTheme({
  direction: 'rtl'
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function App() {

  const queryClient = new QueryClient();


  return (

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Layout>
                <Router />
              </Layout>
            </ThemeProvider>
          </CacheProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
