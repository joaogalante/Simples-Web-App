import { Progress } from 'antd'
import React from 'react'

import Content from '../../../components/structure/Content'
import FlexGrid from '../../../components/structure/FlexGrid'
import FlexGridItem from '../../../components/structure/FlexGridItem'
import Separator from '../../../components/helpers/Separator'

const Overview = () => (
	<Content basicPadding>
		<Separator />
		<FlexGrid>
			<FlexGridItem flex={1} />
			<FlexGridItem flex={1} textCenter>
				<Progress percent={100} type='dashboard' status="active" format={() => `10`} />
				<b>Pesquisas</b>
			</FlexGridItem>
			<FlexGridItem flex={1} textCenter>
				<Progress percent={50} type='dashboard' format={percent => `5`} />
				<b>Em andamento</b>
			</FlexGridItem>
			<FlexGridItem flex={1} textCenter>
				<Progress percent={20} type='dashboard' status="exception" format={() => `2`} />
				<b>Falharam</b>
			</FlexGridItem>
			<FlexGridItem flex={1} textCenter>
				<Progress percent={30} type='dashboard' status="success" format={() => `3`} />
				<b>Finalizadas</b>
			</FlexGridItem>
			<FlexGridItem flex={1} />
		</FlexGrid>
		<Separator />
		<Content basicPadding textCenter>Tempo previsto para conclusão: <b>34min e 22seg</b></Content>
	</Content>
)

export default Overview
