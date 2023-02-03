import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// ユーザ名を保管しておく
export const loginUserState = atom({
    key: "loginUser",
    default: [
        {
            id: "",
            username: "",
        },
    ],
    effects_UNSTABLE: [persistAtom],
});
