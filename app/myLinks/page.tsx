import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export default async function myLinks() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  if (!user?.id) {
    return redirect("/login");
  }

  const { data: links, error } = await supabase
    .from("links")
    .select()
    .eq("userId", user.id);

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
