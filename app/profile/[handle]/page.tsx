import {
  getHandleLinks,
  getProfileImageUrl,
  getUserHandleProfile,
} from "@/services/supabaseServices";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

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
      <h2 className="text-2xl">@{handle}</h2>
      <Image
        src={imageUrl as string}
        alt="profile image"
        width={150}
        height={150}
      />
      <p>
        {first_name} {last_name}
      </p>
      <div className="flex flex-col gap-4">
        {links?.map((link) => (
          <a
            className="bg-gray-600 text-white p-3 md:w-96 relative w-80"
            key={link.id}
            href={link.link}
            target="_blank"
          >
            <p>{link.social}</p>
            <FaArrowRight className="absolute right-9 top-5 cursor-pointer hover:scale-110" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
