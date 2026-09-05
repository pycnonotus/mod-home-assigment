import {baseApi} from './baseApi.ts';
import type {PlaceOrderCommand} from '../../application/order/buildOrder.ts';

export const ordersApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation<{orderId: string; created: boolean}, PlaceOrderCommand>({
            query: body => ({url: 'orders', method: 'POST', body}),
            extraOptions: {maxRetries: 0},
        }),
    }),
});

export const {useCreateOrderMutation} = ordersApi;
