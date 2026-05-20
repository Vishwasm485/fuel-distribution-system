import "./globals.css";

import { Toaster } from "react-hot-toast";

export const metadata = {

  title:
    "Fuel Distribution System",

  description:
    "Smart Fuel Booking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="en"
      data-scroll-behavior="smooth"
    >

      <body>

        <Toaster

          position="top-right"

          toastOptions={{

            style: {

              background: "#0f172a",

              color: "#fff",

              border:
                "1px solid #334155",
            },
          }}
        />

        {children}

      </body>

    </html>
  );
}