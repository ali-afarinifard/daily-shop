"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/context/AuthContext";
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
