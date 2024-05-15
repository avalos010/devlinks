"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { ChangeEvent } from "react";

function ImageUploader() {
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    //TODO!: lets make this work with the server supabase client instead. Keep everything on server.
    const file = e.target.files![0];
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user?.id);

    // Upload file using standard upload
    const { data, error } = await supabase.storage
      .from("profileImages")
      .upload(`${user?.id}/profileImage`, file, { upsert: true }); //upsert: true means we could overwrite the image.
    if (error) {
      console.error(error.message); //TODO!: Handle ERROR
    } else {
      redirect("/profile"); //refresh page to show new profile image after successful upload;
    }
  };

  return (
    <input type="file" name="profilePicture" onChange={handleUploadImage} />
  );
}

export default ImageUploader;
