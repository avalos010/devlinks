import { signout } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";
const Signout = async () => {
  await signout(); //TODO!: Figure out why this isnt working.
  redirect("/login");

  return null;
};

export default Signout;
