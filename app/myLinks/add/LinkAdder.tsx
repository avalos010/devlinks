"use client";
import Select from "react-select";
import { createClient } from "@/utils/supabase/client";

type LinkAdderProps = {
  handleAddLink: (formdata: FormData, social: string) => void;
};

async function LinkAdder({ handleAddLink }: LinkAdderProps) {
  const supabase = createClient();
  const { data: socials } = await supabase.from("socials").select("*");
  let selectedSocial: string | undefined = undefined; //? It Works for now no need for a state unless we run into issues.

  return (
    <div>
      <h3>Add Links</h3>
      <form className="flex flex-col items-center gap-3">
        <Select
          className="text-red-500"
          options={socials?.map((social) => ({
            label: social.name,
            value: social.name,
          }))}
          onChange={(social) => {
            selectedSocial = social?.value;
          }}
          placeholder="Socials"
          isSearchable={true}
        />
        <input name="link" type="text" />
        <button formAction={(e) => handleAddLink(e, selectedSocial as string)}>
          Add Link
        </button>
      </form>
    </div>
  );
}

export default LinkAdder;
