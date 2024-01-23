// @ts-nocheck
import { getCurrentCity } from "@/api";

type CityInfo = {
    center: {
        lng: number;
        lat: number;
    };
    level: number;
    name: string;
    code: number;
};

export function useMap() {
    // map实例
    const createMap = () => {
        const mapObj = new window.BMap.Map('mapContainer');
        mapObj.centerAndZoom(new BMap.Point(114.1693611, 22.3193039), 15);
        mapObj.enableContinuousZoom();
        mapObj.enableScrollWheelZoom();
    }
    // 获取城市数据
    const getCityInfo = (): Promise<CityInfo | undefined> => {
        return new Promise((resolve) => {
            const curCity = new BMap.LocalCity();
            curCity.get(async (res: CityInfo) => {
                const currentCityInfo = await getCurrentCity(res.name);
                resolve(currentCityInfo);
            });
        });
    };
    getCityInfo()
    return { getCityInfo, createMap };
}