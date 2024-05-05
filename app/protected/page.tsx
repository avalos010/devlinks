import { createClient } from "@/utils/supabase/server";
import { protectedPage, supabase } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  await protectedPage();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Protected
    </div>
  );
}
