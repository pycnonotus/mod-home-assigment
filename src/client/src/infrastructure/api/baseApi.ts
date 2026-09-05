import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';

const staggeredBaseQuery = retry(fetchBaseQuery({baseUrl: '/api'}), {maxRetries: 3});
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: staggeredBaseQuery,
    endpoints: () => ({}),
});
