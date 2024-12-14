
import  "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import Script from 'next/script'
import Header from "./components/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container-md">
        <Header/>
        {children}
      </body>
    </html>
  );
}
