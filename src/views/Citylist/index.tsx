import { NavBar } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCityList, getHotCity } from '@/api'
import { List, AutoSizer } from 'react-virtualized'

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

interface ResultData {
  newCityList: CityList;
  cityIndex: string[];
}

const groupCitiesByInitial = (data: CityItem[]): ResultData => {
  const result: CityList = {};
  data.forEach((city) => {
    const key = city.short[0];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(city);
  });
  if (localStorage.getItem('cityInfo')) {
    result['#'] = [JSON.parse(localStorage.getItem('cityInfo') || '{}')]
  }
  return {
    newCityList: result,
    cityIndex: Object.keys(result).sort(),
  };
};

/**
 * 处理字母索引
 *
 * @param {string} letter - 传入的字符
 * @returns {string} 返回的字符
 */
const formatterLetter = (letter: string) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

function swapArrayElements(arr:any[], index1:number, index2:number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

export default function Citylist() {
  const navigate = useNavigate()
  const [cityList, setCityList] = useState<CityList>({})
  const [cityIndex, setCityIndex] = useState<string[]>([])
  // TODO:获取城市列表数据
  useEffect(() => {
    getCityList(1).then(async (res) => {
      const { newCityList, cityIndex } = groupCitiesByInitial(res.data.body)
      getHotCity().then((res) => {
        newCityList['hot'] = res.data.body
        cityIndex.unshift('hot')
        setCityList(newCityList)
        setCityIndex(swapArrayElements(cityIndex, 0, 1))
      })
    })
  }, [])

  const getRowHeight = ({ index }: any) => {
    return 36 + cityList[cityIndex[index]].length * 50
  }
  function rowRenderer({
    key,
    index,
    isScrolling,
    isVisible,
    style,
  }: any) {
    return (
      <div key={key} style={style} className='flex flex-col'>
        <div className='text-[14px] py-[10px] px-[15px] text-[#999999]'>{formatterLetter(cityIndex[index])}</div>
        {
          cityList[cityIndex[index]]?.map((item: CityItem) => {
            return (
              <div key={item.value} className='w-full h-[50px] px-[15px] text-[16px] text-[#333333] bg-white cursor-pointer leading-[50px]' style={{ borderBottom: '1px solid #ececec' }}>{item.label}</div>
            )
          })
        }
      </div>
    );
  }


  return (
    <div className='h-full'>
      {/* 顶部nav */}
      <div className='fixed top-0 w-full z-20'>
        <NavBar
          style={{
            '--height': '36px',
            '--border-bottom': '1px #eee solid',
            background: '#ececec'
          }}
          onBack={() => navigate(-1)}
        >
          城市选择
        </NavBar>
      </div>
      <AutoSizer className='mt-[36px]'>{({ height, width }) =>
        <List
          width={width}
          height={height}
          rowCount={Object.keys(cityList).length}
          rowHeight={getRowHeight}
          rowRenderer={rowRenderer}
        />
      }
      </AutoSizer>
    </div>
  )
}
