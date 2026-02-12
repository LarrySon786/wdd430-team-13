import "./globals.css";
import NavigationClient from "@/components/NavigationClient";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <NavigationClient />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}