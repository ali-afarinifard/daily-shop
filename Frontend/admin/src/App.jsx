import Router from "./router/Router"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";

function App() {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
