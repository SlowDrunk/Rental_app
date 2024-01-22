import service from "@/utils/request";

// 获取swiper数据
const getSwiperData = () => {
    return service("/home/swiper", { method: "get" })
}
// 获取租房小组模块数据
const getRenralGroupData = (areaid: string) => {
    return service(`/home/groups/?id=${areaid}`, { method: "get" })
}


export { getSwiperData, getRenralGroupData }