import { getLinks, protectedPage } from "@/utils/supabase/server-helpers";
import { randomUUID } from "crypto";

export default async function myLinks() {
  await protectedPage();
  const links = await getLinks();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Protected
      {links?.map((link) => (
        <p key={randomUUID()} className="text-red-500">
          {link.id}
        </p>
      ))}
    </div>
  );
}
