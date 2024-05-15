//TODO!: Automatically create profile for user after signup.

import { createClient } from "@/utils/supabase/server";
import { protectedPage } from "@/utils/supabase/server-helpers";
import ImageUploader from "./ImageUploader";
import Image from "next/image";

export default async function ProtectedPage() {
  await protectedPage();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase //Fetch Profile Details
    .from("profile")
    .select("*")
    .eq("user_id", user?.id as string)
    .limit(1)
    .single();

  //TODO! NOT WORKING
  const {
    data: { publicUrl },
  } = supabase.storage //Get Profile Picture
    .from("profileImages")
    .getPublicUrl(`${user?.id}/profileImage`);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Profile
      <Image
        src={publicUrl}
        alt="profile image"
        width={200}
        height={150}
        className="rounded-full"
      />
      <ImageUploader />
      <p>{profile?.first_name}</p>
      <p>{profile?.last_name}</p>
    </div>
  );
}
