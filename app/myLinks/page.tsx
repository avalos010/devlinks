import { protectedPage } from "@/utils/supabase/server-helpers";
import Link from "next/link";
import ActionButtons from "./action-buttons";
import { deleteLink, getOwnLinks } from "@/services/supabaseServices";

export default async function myLinks() {
  await protectedPage();
  const links = await getOwnLinks();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <h2>My Links</h2>
      <Link
        className=" dark:text-white light:text-black bg-transparent p-3 border-white border-dotted border-2 w-44 relative"
        href="/myLinks/add"
      >
        Add Links
        <span className="absolute right-7 text-xl">&#8594;</span>
      </Link>
      <div className="flex flex-col gap-4">
        {links?.map((link) => (
          <div
            className="bg-gray-600 text-white p-3 md:w-96 relative w-80"
            key={link.id}
          >
            <a
              href={link.link}
              target="_blank"
              className="border-b-4 pb-1 hover:border-red-500 border-transparent"
            >
              {link.social}
            </a>
            <ActionButtons linkId={link.id} deleteLink={deleteLink} />
          </div>
        ))}
      </div>
    </div>
  );
}
