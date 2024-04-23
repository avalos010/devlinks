import { headers } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

const supabase = createClient();

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }
  redirect("/myLinks");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

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

export const signout = async () => {
  //!TODO! still doesnt work fix it
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/login");
  }
};

export const getUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return user.id;
};

export const isAuthenticated = async () => {
  if (!getUserId) {
    return false;
  }
  return true;
};
