// @ts-nocheck
import { getCurrentCity } from "@/api";
import { Toast } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
import { getAreaHouses, getCommunityHouses } from '@/api'
import "./label.css";
import { useState } from "react";

type CityInfo = {
    center: {
        lng: number;
        lat: number;
    };
    level: number;
    name: string;
    code: number;
};

interface AreaObject {
    label: string;
    value: string;
    coord: {
        latitude: string;
        longitude: string;
    };
    count: number;
}

// 标签样式
const labelStyle = {
    cursor: 'pointer',
    border: 'none',
    padding: '0',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: '#ffffff',
    textAlign: 'center'
}

const createLabelContent = (type: string, name: string, count: number) => {
    return `
    <div class='${type}'>
        <p class="name">${name}</p>
        <p class="name">${count}套</p>
    </div>
    `

}

export function useMap() {
    const navigate = useNavigate();
    const [houese, setHouese] = useState<any[]>([])
    const [showHouseList, setShowHouseList] = useState<boolean>(false)
    // 创建文本标签
    const createLabel = (houseList: AreaObject[], content: string, mapObj: any) => {
        houseList.forEach(areaInfo => {
            const areaPoint = new window.BMap.Point(areaInfo.coord.longitude, areaInfo.coord.latitude)
            const label = new window.BMap.Label(content, {
                position: areaPoint,                          // 设置标注的地理位置
                offset: new BMap.Size(-35, -35)           // 设置标注的偏移量
            })
            // 添加唯一标识
            label.id = areaInfo.value;
            // 设置标签内容
            const zoom = mapObj.getZoom()
            let nextZoom
            if (zoom >= 10 && zoom < 12) {
                label.setContent(createLabelContent('circle', areaInfo.label, areaInfo.count))
                nextZoom = 13
            } else if (zoom >= 12 && zoom < 14) {
                label.setContent(createLabelContent('circle', areaInfo.label, areaInfo.count))
                nextZoom = 15
            } else if (zoom >= 14 && zoom < 16) {
                label.setContent(createLabelContent('rect', areaInfo.label, areaInfo.count))
            }
            // 设置标签样式
            label.setStyle(labelStyle)
            // 为标签添加指定事件
            label.addEventListener('click', () => {
                handleLabelClick(mapObj, areaPoint, label, nextZoom)
            })
            mapObj.addOverlay(label);
        })
    }
    // TODO:标签点击事件
    const handleLabelClick = async (mapObj: any, point, label, zoom: number) => {
        mapObj.centerAndZoom(point, zoom)
        // 到达小区后不清楚标签
        if (zoom <= 15) {
            setTimeout(() => {
                mapObj.clearOverlays()
            }, 0)
            try {
                Toast.show({
                    icon: 'loading',
                    content: '加载中…',
                    duration: 0,
                })
                const houseList = await getAreaHouses(label.id)
                createLabel(houseList.data.body, '', mapObj)
                Toast.clear()
            } catch (err) {
                console.error(err)
            }
        } else {
            // 点击小区显示小区房源列表
            setCumminityHouse(label.id)
        }
    }
    const setCumminityHouse = (id: string) => {
        getCommunityHouses(id).then((res) => {
            setHouese(res.data.body.list)
            setShowHouseList(true)
        })
    }
    // map实例
    const createMap = () => {
        const mapObj = new window.BMap.Map('mapContainer');
        if (mapObj) {
            // 获取当前城市名称
            const { label, value } = JSON.parse(localStorage.getItem('cityInfo') || '{}')

            const myGeo = new window.BMap.Geocoder();
            // 根据名称拿到城市坐标
            myGeo.getPoint(label, async function (point) {
                if (point) {
                    mapObj.centerAndZoom(point, 11);
                    // 添加比例尺和平移缩放控件
                    mapObj.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }));
                    mapObj.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT }));
                    // 创建label
                    try {
                        Toast.show({
                            icon: 'loading',
                            content: '加载中…',
                            duration: 0,
                        })
                        const houseList = await getAreaHouses(value)
                        createLabel(houseList.data.body, '', mapObj)
                        Toast.clear()
                    } catch (err) {
                        console.error(err)
                    }
                }
            }, label)
            // 开启鼠标滚轮缩放
            mapObj.enableScrollWheelZoom();
            mapObj.enableContinuousZoom();
        }

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
    const setCurrentCity = ({ label, value }: any) => {
        const hasDataCityList = ['北京', '上海', '广州', '深圳']
        if (hasDataCityList.includes(label)) {
            localStorage.setItem('cityInfo', JSON.stringify({ label, value }))
            navigate(-1)
        } else {
            Toast.show({
                content: '该城市暂无房源哦~',
                maskClickable: false,
            })
        }
    }
    return { getCityInfo, createMap, setCurrentCity, showHouseList, houese, setShowHouseList };
}