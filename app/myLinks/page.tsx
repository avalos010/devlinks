import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function myLinks() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  } else {
    const { data: links, error } = await supabase.from("links").select();

    console.log(links, error);

    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        Protected
        {links}
      </div>
    );
  }
}
