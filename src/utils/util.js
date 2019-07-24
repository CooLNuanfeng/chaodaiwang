export const isPhone = (phone) => {
    let reg = /^1\d{10}$/;
    return reg.test(phone)
}

export const isCellPhone = (phone) => {
    let reg = /^([\d-+]*)$/;
    return reg.test(phone);
}

export const isExtPhone = (phone) => {
    let reg = /\d+/
    return reg.test(phone)
}

export const checkPwdLen = (pwd) => {
    return pwd.length >=6 && pwd.length<=12;
}

export const isIdCard = (id) => {
    let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    return reg.test(id)
}