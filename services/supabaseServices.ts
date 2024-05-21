import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  return data.user;
};

export const getUserProfile = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
};

export const getUserHandleProfile = async (handle: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("handle", handle)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
};

export const getProfileImageUrl = async (userId: string) => {
  const supabase = createClient();

  const { data: profileBucketList, error } = await supabase.storage
    .from("profileImages")
    .list(`${userId}`);

  if (error) {
    console.error("Error listing profile bucket:", error);
    return null;
  }

  if (!!profileBucketList?.length) {
    const { data } = supabase.storage
      .from("profileImages")
      .getPublicUrl(`${userId}/profileImage`);

    if (error) {
      console.error("Error getting public URL:", error);
      return null;
    }
    return data.publicUrl;
  }
  return null;
};

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }
  return redirect("/myLinks");
};

export const signUp = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};

export async function deleteLink(linkId: string | number) {
  "use server";
  const supabase = createClient();
  const { error } = await supabase.from("links").delete().eq("id", linkId);

  if (!error) {
    redirect("/myLinks");
  }
}

export const getOwnLinks = async () => {
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

export const getHandleLinks = async (handle: string) => {
  const supabase = createClient();
  const { data: links, error } = await supabase
    .from("links")
    .select()
    .eq("handle", handle);
  return links;
};
