import { headers } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

//TODO!: Fifure out why using only one createClient() instance gives me issues and returns null even after where logged in.
//!Short term fix create an instance in functions that have this issue.
//TODO!: add some error handling to these functions + some e2e to ensure flow runs as expected.

export const supabase = createClient();

export const signIn = async (formData: FormData) => {
  // "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }
  return redirect("/myLinks");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error("Could not register user"); // Throw an error or handle it appropriately
  }

  return { data, error };
};

export const getUserId = async () => {
  //TODO!: doesnt work still get null after signing in sometimes.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  return user.id;
};

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

export const getLinks = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    const { data: links, error } = await supabase
      .from("links")
      .select()
      .eq("userId", user.id);
    return links;
  }
};
