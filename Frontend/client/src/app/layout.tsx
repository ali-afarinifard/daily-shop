// ** Next
import type { Metadata } from "next";

// ** Global CSS
import "./globals.css";

// ** Components
import Navbar from "./components/nav/(page)/Navbar";
import Footer from "./components/footer/Footer";
import ClientProviders from "@/providers/ClientProviders";

// ** Toaster
import { Toaster } from "react-hot-toast";

// ** MUI
import { Box } from "@mui/material";


export const metadata: Metadata = {
  title: "دیجی شاپ",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fa" dir="rtl">
      <body style={{ color: '#334155' }}>

        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff',
          },
        }} />
        <ClientProviders>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: '1',
                mt: '4.5rem'
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </ClientProviders>
      </body>
    </html>
  );
}
