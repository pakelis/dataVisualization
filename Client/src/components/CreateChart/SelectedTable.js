import React, {useState, useEffect} from 'react'
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import {Menu, Dropdown, Button, message, Tooltip} from 'antd'
import {useAuth0} from '../../react-auth0-spa'
import axios from 'axios'

function handleButtonClick(e) {
  message.info('Click on left button.')
  console.log('click left button', e)
}

const SelectedTable = () => {
  const [tableNames, setTableNames] = useState([])
  const [selectedTable, setSelectedTable] = useState()
  const {getTokenSilently} = useAuth0()

  const getTableNames = async () => {
    const token = await getTokenSilently()

    let res = await axios
      .get('/admin/api/tablenames', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        let names = []
        res.data.map(table => names.push(table.tablename))
        setTableNames(names)
      })
  }

  useEffect(() => {
    getTableNames()
  }, [])

  const handleMenuClick = e => {
    setSelectedTable(tableNames[e.key]) // e.key get index of dropdown
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {tableNames.map((name, index) => {
        return (
          <Menu.Item key={index}>
            <UserOutlined />
            {name}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button>
          Tables <DownOutlined />
        </Button>
      </Dropdown>
      {selectedTable != null ? (
        <div>Selected table - {selectedTable} </div>
      ) : null}
    </div>
  )
}

export default SelectedTable
