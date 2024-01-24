import { NavBar } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCityList, getHotCity } from '@/api'

interface CityItem {
  label: string;
  value: string;
  pinyin: string;
  short: string;
}

interface CityList {
  [key: string]: CityItem[];
}

/**
 * 用于将后端返回的数据转化为需要的格式
 *
 * @param {CityItem[]} data - 后端返回的数据
 * @returns {CityList} - 格式化后的数据
 */

const groupCitiesByInitial = (data: CityItem[]): CityList => {
  const result: CityList = {};
  data.forEach((city) => {
    const key = city.short[0];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(city);
  });
  return result;
};



export default function Citylist() {
  const navigate = useNavigate()
  const [cityList, setCityList] = useState<CityItem[]>([])
  // TODO:获取城市列表数据
  useEffect(() => {
    getCityList(1).then(async (res) => {
      setCityList(res.data.body)
      let newCityList = groupCitiesByInitial(res.data.body)
      const cityIndex = ['hot', ...Object.keys(newCityList).sort()]
      newCityList['hot'] = (await getHotCity()).data.body
      console.log(newCityList, cityIndex)
    })
  }, [])

  return (
    <div>
      {/* 顶部nav */}
      <NavBar
        style={{
          '--height': '36px',
          '--border-bottom': '1px #eee solid',
          background: '#ececec'
        }}
        onBack={() => navigate(-1)}
      >
        城市列表
      </NavBar>
    </div>
  )
}
