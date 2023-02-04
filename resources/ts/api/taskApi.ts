import { axiosClient } from "./axiosClient";

export const taskApi = {
    create: () => axiosClient.post("/api/task"),
    getAll: () => axiosClient.get("/api/task"),
    getOne: (id) => axiosClient.get(`/api/task/${id}`),
};
