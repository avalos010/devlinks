import {
  getUserId,
  isAuthenticated,
  supabase,
} from "@/utils/supabase/server-helpers";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export default async function myLinks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: links, error } = await supabase
    .from("links")
    .select()
    .eq("userId", await getUserId());

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
