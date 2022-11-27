import dayjs from "dayjs";

export const dateConvert = date => dayjs(date).format('HH:mm DD/MM/YYYY')
