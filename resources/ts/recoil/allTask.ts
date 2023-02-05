import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

// 全タスクを保管
export const allTaskState = atom({
    key: "allTask",
    default: [],

    // effects_UNSTABLE: [persistAtom],
});
