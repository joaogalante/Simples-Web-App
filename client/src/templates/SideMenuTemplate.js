import {Layout} from 'antd'
import React from 'react'

import Affix from '../components/structure/Affix'
import Container from '../components/structure/Container'
import FlexGridItem from '../components/structure/FlexGridItem'
import HeaderBar from '../components/structure/HeaderBar'
import MainContent from '../components/structure/MainContent'
import MainMenu from '../components/structure/MainMenu'
import PrivateContentWrapper from '../logicContainers/session/PrivateContentWrapper'

const {Content} = Layout

const SideMenuTemplate = ({children, activeMenuItem}) => (
  <PrivateContentWrapper>
    <Layout className="layout">
      <HeaderBar />
      <Container stretch>
        <FlexGridItem flex={8}>
          <Affix>
            <MainContent>
              <MainMenu active={activeMenuItem} />
            </MainContent>
          </Affix>
        </FlexGridItem>

        <FlexGridItem empty />

        <FlexGridItem flex={28}>
          <MainContent>{children}</MainContent>
        </FlexGridItem>

        <FlexGridItem empty />
      </Container>
    </Layout>
  </PrivateContentWrapper>
)

export default SideMenuTemplate
