import './SideBar.css'

import {connect} from 'react-redux'
import React from 'react'

import {destroyUserSession} from '../../helpers/sessionHelpers'
import FlexGridItem from './FlexGridItem'
import SideBar, {SideBarItem, SideBarLinksSection} from './SideBar'

const MainMenu = props => (
  <SideBar>
    <FlexGridItem flex={1}>
      <SideBarLinksSection>
        <SideBarItem label="Empresas" to="/" icon="building" active={props.active === 'legalEntities'} />
        <SideBarItem
          label="P. Físicas"
          to="/individual-entities"
          icon="users"
          active={props.active === 'individualEntities'}
        />
        <SideBarItem label="Controles" to="/controls" icon="papers" active={props.active === 'controls'} />
      </SideBarLinksSection>
    </FlexGridItem>

    <FlexGridItem>
      <SideBarLinksSection borderTop>
        <SideBarItem label="Logout" onClick={props.logout} icon="out" />
      </SideBarLinksSection>
    </FlexGridItem>
  </SideBar>
)

const mapActions = () => ({
  logout: destroyUserSession,
})

export default connect(null, mapActions)(MainMenu)
