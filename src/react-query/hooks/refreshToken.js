import { useMutation } from "@tanstack/react-query"
import { refreshToken } from "../../api/refreshToken"

export const useRefreshToken = () => {
    return useMutation({mutationFn: refreshToken})
}
