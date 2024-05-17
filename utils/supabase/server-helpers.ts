import { headers } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

//TODO!: Fifure out why using only one createClient() instance gives me issues and returns null even after where logged in.
//!Short term fix create an instance in functions that have this issue.
//TODO!: add some error handling to these functions + some e2e to ensure flow runs as expected.

export const supabase = createClient();

export const isAuthenticated = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }
  return true;
};

export const protectedPage = async () => {
  "use server";
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const { user } = data;

  if (!user?.id) {
    return redirect("/login");
  }
};
