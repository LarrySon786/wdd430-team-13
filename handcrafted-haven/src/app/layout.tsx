import "./globals.css";
//import Navigation from "@/components/Navigation";
import NavigationClient from "@/components/NavigationClient";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavigationClient />
        {children}
        <Footer />
      </body>
    </html>
  );
}
