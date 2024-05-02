import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const { user } = data;

  if (!user?.id) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Protected
    </div>
  );
}
