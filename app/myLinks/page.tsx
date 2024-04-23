import { createClient } from "@/utils/supabase/server";
import { getUserId, isAuthenticated } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";

export default async function myLinks() {
  const supabase = createClient();

  if (!isAuthenticated) {
    return redirect("/login");
  }
  const { data: links, error } = await supabase
    .from("links")
    .select()
    .eq("userId", getUserId);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Protected
      {links?.length}
    </div>
  );
}
