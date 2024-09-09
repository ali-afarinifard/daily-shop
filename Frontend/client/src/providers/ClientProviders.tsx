"use client";

// ** RTK-Q
import { Provider } from "react-redux";
import { store } from "@/store/store";

// ** Auth Context
import { AuthProvider } from "@/context/AuthContext";

// ** Provider Components
import CartProvider from "@/providers/CartProvider";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default ClientProviders;
