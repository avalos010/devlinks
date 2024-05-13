import { createClient } from "@/utils/supabase/server";
import { protectedPage, supabase } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  await protectedPage();
  const supabase = createClient();

  const fetchUser = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", fetchUser.data.user?.id as string)
    .limit(1)
    .single();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Profile
      <p>{data?.first_name}</p>
      <p>{data?.last_name}</p>
    </div>
  );
}
