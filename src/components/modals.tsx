"use client";

import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [momunted, setMomunted] = useState(false);

  useEffect(() => {
      setMomunted(true);
  }, []);
  if(!momunted) return null

  return (
    <>
      <CreateChannelModal/>
      <CreateWorkspaceModal />
    </>
  );
};
