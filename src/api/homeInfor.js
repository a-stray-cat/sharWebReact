import ajax from './ajax'

export const getInfor = () => ajax('/homepage/information',{},'GET')