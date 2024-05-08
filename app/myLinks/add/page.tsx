import { protectedPage } from "@/utils/supabase/server-helpers";
import React from "react";
import LinkAdder from "./LinkAdder";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function page() {
  try {
    await protectedPage();

    const handleAddLink = async (formData: FormData, social: string) => {
      "use server";

      const supabase = createClient();
      const link = formData.get("link") as string;
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        const { data: linksForSocial } = await supabase
          .from("links")
          .select("*")
          .eq("social", social)
          .eq("userId", user.id);

        if (!linksForSocial?.length) {
          //only add link if it doesnt already exist
          await supabase
            .from("links")
            .insert({ link, social, userId: user.id });
          return redirect("/myLinks");
        } else {
          await supabase.from("links").update({ link }).eq("userId", user.id);
          return redirect("/myLinks");
        }
      }
    };

    return (
      <>
        <LinkAdder handleAddLink={handleAddLink} />
      </>
    );
  } catch (error) {
    console.error("Error occurred while trying to add links:", error);
    // return redirect("/error"); //TODO!:   Handle the error, e.g., redirect to an error page
  }
}

export default page;
