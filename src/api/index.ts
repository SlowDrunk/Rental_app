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
// 获取城市列表
const getCityList = (level: number) => {
    return service(`/area/city/?level=${level}`, { method: "get" })
}
// 获取热门城市
const getHotCity = () => {
    return service(`/area/hot`, { method: "get" })
}
// 获取区域下的房源信息
const getAreaHouses = (areaId: string) => {
    return service(`/area/map/?id=${areaId}`, { method: 'get' })
}
// 获取小区下的房源信息
const getCommunityHouses = (communityId: string) => {
    return service(`/houses?cityId=${communityId}`, { method: 'get' })
}

export { getSwiperData, getRenralGroupData, getRenralNewsData, getCurrentCity, getCityList, getHotCity, getAreaHouses, getCommunityHouses }