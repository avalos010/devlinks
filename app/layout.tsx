import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { isAuthenticated } from "@/utils/supabase/server-helpers";
import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

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
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const { user } = data;

  //TODO! handle Error

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {user?.id ? <Nav /> : null}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
