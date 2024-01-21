import service from "@/utils/request";

// 获取swiper数据
const getSwiperData = () => {
    return service("/home/swiper", { method: "get" })
}



export { getSwiperData }