import { axiosClient } from "./axiosClient";

export const taskApi = {
    create: () => axiosClient.post("/api/task"),
    getAll: () => axiosClient.get("/api/task"),
    getOne: (id) => axiosClient.get(`/api/task/${id}`),
    update: (id, params) => axiosClient.put(`/api/task/${id}`, params),
    delete: (id) => axiosClient.delete(`/api/task/${id}`),
};
