import { headers } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

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
  console.log(data);
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
