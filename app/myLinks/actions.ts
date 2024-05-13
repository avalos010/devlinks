import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";

export async function deleteLink(linkId: string | number) {
  "use server";
  const supabase = createClient();
  const { error } = await supabase.from("links").delete().eq("id", linkId);

  if (!error) {
    redirect("/myLinks");
  }
}
