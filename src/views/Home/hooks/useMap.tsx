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

interface MapFunctions {
    createMap: () => void;
    getCityInfo: () => Promise<CityInfo | undefined>;
    setCurrentCity: (city: string) => void;
}

export function useMap(): MapFunctions {
    // map实例
    const createMap = () => {
        const mapObj = new window.BMap.Map('mapContainer');
        mapObj.centerAndZoom(new BMap.Point(114.1693611, 22.3193039), 15);
        mapObj.enableContinuousZoom();
        mapObj.enableScrollWheelZoom();
    }
    // 获取当前定位城市数据
    const getCityInfo = async (): Promise<CityInfo | undefined> => {
        const localCity = localStorage.getItem('cityInfo');
        if (!localCity) {
            return new Promise((resolve, reject) => {
                const curCity = new BMap.LocalCity()
                curCity.get(async res => {
                    try {
                        const result = await getCurrentCity(res.name)
                        // 进行本地存储
                        localStorage.setItem('cityInfo', JSON.stringify(result.data.body))
                        resolve(result.data.body)
                    } catch (err) {
                        reject(err)
                    }
                })
            });
        } else {
            return new Promise(resolve => resolve(JSON.parse(localCity)))
        }
    }
    // 设置当前城市
    const setCurrentCity = (city: any) => {
        if (!localStorage.getItem('cityInfo')) {
            localStorage.setItem('cityInfo', JSON.stringify({ city: city }))
        }
    }
    getCityInfo()
    return { getCityInfo, createMap, setCurrentCity };
}