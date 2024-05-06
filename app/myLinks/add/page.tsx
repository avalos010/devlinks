import { protectedPage } from "@/utils/supabase/server-helpers";
import React from "react";
import LinkAdder from "./LinkAdder";

async function page() {
  await protectedPage();
  return (
    <>
      <LinkAdder />
    </>
  );
}

export default page;
