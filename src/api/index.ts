import service from "@/utils/request";

// 获取swiper数据
const getSwiperData = () => {
    return service("/home/swiper", { method: "get" })
}
// 获取租房小组模块数据
const getRenralGroupData = (areaid: string) => {
    return service(`/home/groups/?id=${areaid}`, { method: "get" })
}
// 获取租房小组模块数据
const getRenralNewsData = (areaid: string) => {
    return service(`/home/news/?id=${areaid}`, { method: "get" })
}
// 获取当前城市信息
const getCurrentCity = (name: string) => {
    return service(`/area/info/?name=${name}`, { method: "get" })
}


export { getSwiperData, getRenralGroupData, getRenralNewsData, getCurrentCity }