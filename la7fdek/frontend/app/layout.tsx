import { Orbitron, Open_Sans } from 'next/font/google'
import { Toaster } from "react-hot-toast"
import "./globals.css";

const toastOptions = {
  style: {
    borderRadius: "8px",
    padding: "12px 16px",
    fontWeight: "bold",
    border: "3px solid rgba(0, 255, 133, 0.2)",
    background:
      "linear-gradient(135deg, rgba(56, 102, 65, 0.2), rgba(0, 255, 133, 0.2))",
    color: "#e0e0e0",
  },
  iconTheme: {
    primary: "#e0e0e0",
    secondary: "rgba(56, 102, 65)",
  },
}

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${openSans.variable}`}>
      <body>
        <Toaster position="top-center" toastOptions={toastOptions} />
        {children}
      </body>
    </html>
  );
}
