import './Alert.css'

import { Alert } from 'antd'
import React from 'react'

const InternalAlert = (props) => (
	<Alert className='alert' {...props} />
)

export default InternalAlert 
