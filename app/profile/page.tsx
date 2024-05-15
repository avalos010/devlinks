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
  const { data } = await supabase.storage //Get Profile Picture
    .from("Avatar")
    .createSignedUrl(`${user?.id}/profileImage`, 300);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Profile
      <Image
        src={data?.signedUrl as string}
        alt="profile image"
        width={500}
        height={500}
      />
      <ImageUploader />
      <p>{profile?.first_name}</p>
      <p>{profile?.last_name}</p>
    </div>
  );
}
