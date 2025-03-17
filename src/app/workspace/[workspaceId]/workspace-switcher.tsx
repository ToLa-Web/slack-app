"use client"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

;
import { use } from "react";

export const WorkspaceSwitcher = () => {
    const workspaceId = useWorkspaceId()
    
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({id: workspaceId})

    const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId)
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                A
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">

        </DropdownMenuContent>
    </DropdownMenu>
  )
};
