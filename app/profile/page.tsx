import { protectedPage } from "@/utils/supabase/server-helpers";
import {
  getUser,
  getUserProfile,
  getProfileImageUrl,
} from "@/services/supabaseServices";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

export default async function ProtectedPage() {
  await protectedPage();

  const user = await getUser();
  const profile = user ? await getUserProfile(user.id) : null;
  const imageUrl = user ? await getProfileImageUrl(user.id) : null;

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Profile
      {imageUrl ? (
        <Image src={imageUrl} alt="profile image" width={150} height={150} />
      ) : (
        <h3>No profile image uploaded</h3>
      )}
      <ImageUploader />
      <p>{profile?.first_name}</p>
      <p>{profile?.last_name}</p>15
    </div>
  );
}
