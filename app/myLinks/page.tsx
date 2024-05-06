import { getLinks, protectedPage } from "@/utils/supabase/server-helpers";
import Link from "next/link";

export default async function myLinks() {
  await protectedPage();
  const links = await getLinks();

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
      {links?.map((link) => (
        <a
          href={link.link}
          target="_blank"
          key={link.id}
          className="bg-gray-600 text-white p-3 md:w-96 relative w-80"
        >
          {link.social}
          <span className="absolute right-7 text-xl">&#8594;</span>
        </a>
      ))}
    </div>
  );
}
