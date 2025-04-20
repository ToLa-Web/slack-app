import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

interface UseCurrentMemberProps {
    workspaceId: Id<"workspaces">;
}
export const useCurrentMember = ({workspaceId} : UseCurrentMemberProps) => {
    const data = useQuery(api.member.current, {workspaceId})
    const isloading = data === undefined

    return { data, isloading };
}   