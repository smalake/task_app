import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { taskApi } from "../api/taskApi";
import { TaskList } from "../types/TaskList";

// const { persistAtom } = recoilPersist();

// 全タスクを保管
export const allTaskState = atom({
    key: "allTask",
    default: selector({
        key: "getAllTaskState",
        get: async ({ get }) => {
            try {
                const res = await taskApi.getAll();
                return res.data;
            } catch (err) {
                console.log(err);
            }
        },
    }),

    // effects_UNSTABLE: [persistAtom],
});
