/** @format */

import { TQueryParams, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createOrder: builder.mutation({
         query: (productInfo) => ({
            url: "/order",
            method: "POST",
            body: productInfo,
         }),
      }),
      getAllOrders: builder.query({
         query: (agrs) => {
            const params = new URLSearchParams();
            console.log("args", agrs);

            if (agrs) {
               agrs.forEach((item: TQueryParams) => {
                  params.append(item.name, item.value as string);
                  console.log("params", params);
               });
            }
            return {
               url: `/order/all-orders`,
               method: "GET",
               params: params,
            };
         },
         transformResponse: (response: TResponseRedux<any>) => {
            console.log("from redux", response);
            return {
               data: response.data,
               meta: response.data.meta,
            };
         },
      }),
      getOrders: builder.query({
         query: () => ({
            url: `/order`,
            // params: { user_id },
            method: "GET",
         }),
      }),
      verifyOrder: builder.query({
         query: (order_id) => ({
            url: "/order/verify",
            params: { order_id },
            method: "GET",
         }),
      }),
      getMyOrders: builder.query({
         query: (user_id) => ({
            url: `/order/my-orders/${user_id}`,
            // params: { user_id },
            method: "GET",
         }),
      }),
   }),
});

export const {
   useCreateOrderMutation,
   useGetMyOrdersQuery,
   useVerifyOrderQuery,
   useGetAllOrdersQuery,
   useGetOrdersQuery,
} = orderApi;
