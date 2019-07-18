export const isPhone = (phone) => {
    let reg = /^1\d{10}$/;
    return reg.test(phone)
}

export const checkPwdLen = (pwd) => {
    return pwd.length >=6 && pwd.length<=12;
}