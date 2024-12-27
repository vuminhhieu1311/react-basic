import { useMutation } from "@tanstack/react-query"
import { logout } from "../../api/logout"

export const useLogout = () => {
    return useMutation({mutationFn: logout})
}