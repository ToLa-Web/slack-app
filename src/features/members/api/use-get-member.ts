import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMemberProp {
    id: Id<"members">;
}
export const useGetMember = ({ id } : UseGetMemberProp) => {
    const data = useQuery(api.member.getById, { id })
    const isLoading = data === undefined

    return { data, isLoading };
}