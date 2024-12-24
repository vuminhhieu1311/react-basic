import { useMutation, useQuery } from "@tanstack/react-query";
import { createCustomer } from "../../api/createCustomer";
import { getCustomersPaginate } from "../../api/getCustomersPaginate";
import { deleteCustomer } from "../../api/deleteCustomer";
import { updateCustomer } from "../../api/updateCustomer";
import queryKeys from "../constants/queryKeys";

export const useCustomersPaginate = (page) => {
    return useQuery({
        queryKey: [queryKeys.getCustomersPaginate, page], 
        queryFn: () => getCustomersPaginate(page),
        staleTime: 10000,
        keepPreviousData: true,
    })
}

export const useCreateCustomer = () => {
    return useMutation({mutationFn: createCustomer})
}

export const useDeleteCustomer = () => {
    return useMutation({mutationFn: deleteCustomer})
}

export const useUpdateCustomer = () => {
    return useMutation({mutationFn: updateCustomer})
}
