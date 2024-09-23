"use client";

// ** RTK-Q
import { Provider } from "react-redux";
import { store } from "@/store/store";

// ** Auth Context
import { AuthProvider } from "@/context/AuthContext";

// ** Provider Components
import CartProvider from "@/providers/CartProvider";

import { useTheme } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/app/theme";
import CssBaseline from '@mui/material/CssBaseline';


const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientProviders;
