import { createClient } from "@/utils/supabase/server";
import { isAuthenticated, supabase } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";
const Signout = async () => {
  "use server";
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Could not signout"); // Throw an error or handle it appropriately
  }
  return redirect("/login");
};

export default Signout;
