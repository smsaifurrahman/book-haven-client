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
      query: () =>({
        url: `/order/all-orders`,
        // params: { user_id },
        method: "GET",
      }),
    }),
    getOrders: builder.query({
      query: () =>({
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
  useGetOrdersQuery
} = orderApi;