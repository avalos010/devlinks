import { createClient } from "@/utils/supabase/server";
import { protectedPage } from "@/utils/supabase/server-helpers";
import { redirect } from "next/navigation";
import React from "react";

async function LinkAdder() {
  await protectedPage();
  return <div>LinkAdder</div>;
}

export default LinkAdder;
