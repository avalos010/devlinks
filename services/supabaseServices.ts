import { createClient } from "@/utils/supabase/server";

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
