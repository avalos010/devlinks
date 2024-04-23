import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { isAuthenticated } from "@/utils/supabase/server-helpers";
import Nav from "@/components/Nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const auth = await isAuthenticated();
  //TODO! figure out how to show navbar only to authencated users
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {/* {isAuthenticated && <Nav />} */}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
