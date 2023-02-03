// Cookieの有効期限用に1週間後の23:59を返す関数
export const createExpireDate = () => {
    let expireDate: Date = new Date(); //今日の日時取得
    expireDate.setDate(expireDate.getDate() + 7); //1週間後の日付取得
    expireDate.setHours(23); //有効期限の時をセット
    expireDate.setMinutes(59); //有効期限の分をセット
    expireDate.setSeconds(59); //有効期限の秒をセット
    return expireDate;
};
