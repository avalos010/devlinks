import { signout } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";
const Signout = () => {
  signout();
  redirect("/login");
};

export default Signout;
