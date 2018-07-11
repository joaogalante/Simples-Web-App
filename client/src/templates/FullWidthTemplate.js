import { Layout } from 'antd'
import React from 'react'

import Container from '../components/structure/Container'
import FlexGridItem from '../components/structure/FlexGridItem'
import HeaderBar from '../components/structure/HeaderBar'
import MainContent from '../components/structure/MainContent'
import PrivateContentWrapper from
  '../logicContainers/session/PrivateContentWrapper'

const { Content } = Layout

const FullWidthTemplate = ({ children, activeMenuItem }) => (
	<PrivateContentWrapper>
		<Layout className='layout'>
			<HeaderBar />
			<Container stretch>
				<FlexGridItem empty />

				<FlexGridItem flex={36}>
					<MainContent>
						{children}
					</MainContent>
				</FlexGridItem>

				<FlexGridItem empty />
			</Container>
		</Layout>
	</PrivateContentWrapper>
)

export default FullWidthTemplate 
