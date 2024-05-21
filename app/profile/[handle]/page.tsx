import {
  getHandleLinks,
  getProfileImageUrl,
  getUserHandleProfile,
} from "@/services/supabaseServices";
import { redirect } from "next/navigation";
import Image from "next/image";

const UserProfile = async ({ params }: { params: { handle: string } }) => {
  const userProfile = await getUserHandleProfile(params.handle);
  const links = await getHandleLinks(params.handle);
  if (!userProfile) {
    redirect("/not-found"); //Doesnt really exist but it does throw a 404 so i guess it works.
  }
  const { first_name, last_name, handle, user_id } = userProfile;
  const imageUrl = await getProfileImageUrl(user_id as string);
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Profile
      <Image
        src={imageUrl as string}
        alt="profile image"
        width={150}
        height={150}
      />
      <p>
        {first_name} {last_name}
      </p>
    </div>
  );
};

export default UserProfile;
