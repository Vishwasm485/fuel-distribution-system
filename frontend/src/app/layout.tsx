import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Fuel Distribution System",
  description: "Smart Fuel Booking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Toaster position="top-right" />

        {children}

      </body>
    </html>
  );
}