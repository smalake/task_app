export const createRandom = (numLength) => {
    const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+";
    return Array.from(crypto.getRandomValues(new Uint32Array(numLength)))
        .map((v) => S[v % S.length])
        .join("");
};
