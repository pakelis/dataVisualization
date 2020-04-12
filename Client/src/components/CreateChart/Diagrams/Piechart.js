import React from 'react'

//react-responsive
import {useMediaQuery} from 'react-responsive'

//recharts
import {Tooltip, Legend, ResponsiveContainer, PieChart, Pie} from 'recharts'

const Piechart = ({chartData, indicator, chartNameField}) => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})

  console.log(chartData)

  return (
    <>
      {indicator.length != 0 ? (
        <div>
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#1DA57A"
              isAnimationActive={false}
            />
            <Tooltip />
            {/* <Legend /> */}
          </PieChart>
        </div>
      ) : null}
    </>
  )
}

export default Piechart
