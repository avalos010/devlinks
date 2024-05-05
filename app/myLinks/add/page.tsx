import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function LinkAdder() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  if (!user?.id) {
    return redirect("/login");
  }
  return <div>LinkAdder</div>;
}

export default LinkAdder;
