"use client";
import Select from "react-select";
import React from "react";
import { createClient } from "@/utils/supabase/client";

async function LinkAdder() {
  const supabase = createClient();

  const { data: socials } = await supabase.from("socials").select("*");

  console.log(socials);
  return (
    <div>
      <h3>Add Links</h3>
      <form className="flex flex-col items-center bg-black gap-3">
        <Select
          className="text-red-500"
          options={socials?.map((social) => ({
            label: social.name,
            value: social.name,
          }))}
          onChange={(item) => console.log(item)}
          placeholder="Socials"
          isSearchable={true}
        />
        <input name="link" type="text" />
        <input type="button" value="Add Link" />
      </form>
    </div>
  );
}

export default LinkAdder;
