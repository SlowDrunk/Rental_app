import React, { createRef, useEffect, useState } from 'react'
import { getCityList, getHotCity } from '@/api'
import { List, AutoSizer } from 'react-virtualized'
import { FireFill } from 'antd-mobile-icons'
import { useMap } from '../../hooks/useMap'
import NavHeader from '@/components/NavHeader'
import { Toast } from 'antd-mobile'

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
// TODO:交换数组
function swapArrayElements(arr: any[], index1: number, index2: number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}



export default function Citylist() {
  const [cityList, setCityList] = useState<CityList>({})
  const [cityIndex, setCityIndex] = useState<string[]>([])
  const virtuslList = createRef<any>()
  const { setCurrentCity } = useMap()
  // TODO:获取城市列表数据
  useEffect(() => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    })
    getCityList(1).then(async (res) => {
      const { newCityList, cityIndex } = groupCitiesByInitial(res.data.body)
      getHotCity().then((res) => {
        newCityList['hot'] = res.data.body
        cityIndex.unshift('hot')
        setCityList(newCityList)
        setCityIndex(swapArrayElements(cityIndex, 0, 1))
        Toast.clear()
      })
    })
  }, [])
  // TODO:动态计算每一个城市名称高度
  const getRowHeight = ({ index }: any) => {
    return 36 + cityList[cityIndex[index]].length * 50
  }
  // TODO:渲染城市列表
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
              <div key={item.value} className='w-full h-[50px] px-[15px] text-[16px] text-[#333333] bg-white cursor-pointer leading-[50px]' style={{ borderBottom: '1px solid #ececec' }} onClick={() => {
                setCurrentCity(item)
              }}>{item.label}</div>
            )
          })
        }
      </div>
    );
  }

  // TODO:索引点击事件
  const handleIndexClick = (index: number) => {
    if (virtuslList.current) {
      virtuslList.current.scrollToRow(index)
    }
  }
  // TODO:渲染右侧索引列表
  const renderIndexList = (cityIndex: string[]) => {
    return cityIndex.map((letter, index) => {
      return (
        <li className='flex-1' key={letter} >
          <span onClick={() => handleIndexClick(index)} className='w-[15px] h-[15px] rounded-[50%]  flex justify-center items-center' style={activeCityIndex === index ? { color: '#fff', background: '#21b97a' } : {}}>{letter === 'hot' ? <FireFill /> : letter.toLocaleUpperCase()}</span>
        </li>
      )
    })
  }
  const [activeCityIndex, setActiveCityIndex] = useState<number>(0)
  // TODO:滚动列表激活右侧索引
  const onRowsRendered = ({ startIndex }: any) => {
    if (startIndex !== activeCityIndex) {
      setActiveCityIndex(startIndex)
    }
  }

  return (
    <div className='h-full'>
      {/* 顶部nav */}
      <div className='fixed top-0 w-full z-20'>
        <NavHeader header={'城市列表'}></NavHeader>
      </div>
      <AutoSizer className='mt-[36px]'>{({ height, width }) =>
        <List
          ref={virtuslList}
          width={width}
          height={height}
          rowCount={Object.keys(cityList).length}
          rowHeight={getRowHeight}
          rowRenderer={rowRenderer}
          onRowsRendered={onRowsRendered}
          scrollToAlignment='start'
        />
      }
      </AutoSizer>
      <div className='absolute right-[5px]  h-[90%]   pt-[20px]'>
        <ul className='flex flex-col h-full justify-between  text-center'>
          {renderIndexList(cityIndex)}
        </ul>
      </div>
    </div>
  )
}
