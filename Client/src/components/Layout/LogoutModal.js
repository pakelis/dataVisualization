import React, {forwardRef, useImperativeHandle} from 'react'

//ant-d
import {Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'

const {confirm} = Modal

const LogoutModal = (props, ref) => {
  const {logout} = props
  console.log(logout)
  useImperativeHandle(ref, () => ({
    showConfirm() {
      confirm({
        title: 'Are you sure you want to logout?',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          logout()
        },
        onCancel() {
          console.log('Canceled')
        },
      })
    },
  }))

  return <></>
}

export default LogoutModal
