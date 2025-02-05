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
    getOrders: builder.query({
      query: () => "/order",
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = orderApi;