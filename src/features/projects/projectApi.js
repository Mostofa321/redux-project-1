import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/projects',
        }),
    }),
});

export const {
    useGetProjectsQuery,
} = projectsApi;