"use client";
import { checkIfHandleExist } from "@/services/supabaseServices";
import React, { useEffect, useRef, useState } from "react";

type HandleInputProps = {
  handleCheck: (handle: string) => Promise<boolean>;
};

const HandleInput = ({ handleCheck }: HandleInputProps) => {
  const handleRef = useRef(null!);
  const [handle, setHandle] = useState("");
  const [handleExist, setHandleExist] = useState(false);

  async function isHandleAvailable() {
    setHandleExist(await handleCheck(handle));
  }

  useEffect(() => {
    isHandleAvailable();
  }, [handle]);

  return (
    <>
      <label className="text-md" htmlFor="password">
        Handle
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="text"
        name="handle"
        onChange={(e) => setHandle(e.target.value)}
      />

      {handleExist ? (
        <span className="text-red-600">Handle Taken</span>
      ) : (
        <span className="text-green-600">Handle Available</span>
      )}
    </>
  );
};

export default HandleInput;
