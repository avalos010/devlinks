"use client";

import { FaTrash } from "react-icons/fa";
import { deleteLink } from "./actions";

type ActionButtonsProps = {
  linkId: string | number;
  deleteLink: (linkId: string | number) => void;
};

const ActionButtons = ({ linkId, deleteLink }: ActionButtonsProps) => {
  return (
    <div className="absolute right-7 top-4 text-xl flex flex-row gap-2">
      <FaTrash className="cursor-pointer" onClick={() => deleteLink(linkId)} />
    </div>
  );
};
export default ActionButtons;
