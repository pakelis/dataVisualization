import React, {useState, useEffect} from 'react'
import {useAuth0} from '../../react-auth0-spa'
import {useSelectedTableValue} from '../../context'

//react-responsive
import {useMediaQuery} from 'react-responsive'

//libs
import axios from 'axios'

//antd
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import {message, Typography, List, Radio} from 'antd'

const {Text} = Typography

function handleButtonClick(e) {
  message.info('Click on left button.')
  console.log('click left button', e)
}

const SelectedTable = () => {
  const [tableNames, setTableNames] = useState([])
  const {getTokenSilently} = useAuth0()
  const {setSelectedTable} = useSelectedTableValue()
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})

  const getTableNames = async () => {
    const token = await getTokenSilently()

    let res = await axios
      .get('/admin/api/tablenames', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let names = []
        res.data.map((table) => names.push(table.tablename))
        setTableNames(names)
      })
  }

  useEffect(() => {
    getTableNames()
  }, [])

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
  }

  return (
    <div className="list-wrapper">
      <Text strong className="section__text">
        Select Table from the list
      </Text>
      <Radio.Group onChange={onChange}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={tableNames}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Radio value={index} onClick={() => setSelectedTable(item)}>
                    {item}
                  </Radio>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </Radio.Group>
    </div>
  )
}

export default SelectedTable
