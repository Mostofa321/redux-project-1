import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
        }),

        changeStutus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const task = await queryFulfilled;
                if (task) {
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTasks",
                            undefined,
                            (draft) => {
                                draft.map(i => {
                                    if (i.id === task?.data?.id) {
                                        i.status = task.data.status;
                                    }
                                })
                            }
                        )
                    );
                }
            },
        }),

        addTask: builder.mutation({
            query: ({ data }) => ({
                url: "/tasks",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const task = await queryFulfilled;
                if (task.data.id) {
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTasks",
                            undefined,
                            (draft) => {
                                draft.push(task.data)
                            }
                        )
                    );
                }
            },
        }),

        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const task = await queryFulfilled;
                if (task) {
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTasks",
                            undefined,
                            (draft) => {
                                draft.map(i => {
                                    if (i.id === task?.data?.id) {
                                        i.taskName = task.data.taskName;
                                        i.teamMember = task.data.teamMember;
                                        i.project = task.data.project;
                                        i.deadline = task.data.deadline;
                                    }
                                })
                            }
                        )
                    );
                }
            },
        }),

        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(x => x.id == arg.id);
                            draft.splice(parseInt(index), 1)
                        }
                    )
                );
                // optimistic cache update end

                try {
                    const res = await queryFulfilled;
                } catch (err) {
                    pathResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useChangeStutusMutation,
} = tasksApi;