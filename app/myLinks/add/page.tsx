import { protectedPage } from "@/utils/supabase/server-helpers";
import React from "react";
import LinkAdder from "./LinkAdder";

async function page() {
  await protectedPage();

  const handleAddLink = async (formData: FormData, social: string) => {
    "use server";
    console.log(formData.get("link"), social);
  };
  return (
    <>
      <LinkAdder handleAddLink={handleAddLink} />
    </>
  );
}

export default page;
