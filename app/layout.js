
import "./globals.css";

export const metadata = {
  title: "Task Tracker",
  description: "Keep Track Of Your Tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      
      >
        {children}
      </body>
    </html>
  );
}
