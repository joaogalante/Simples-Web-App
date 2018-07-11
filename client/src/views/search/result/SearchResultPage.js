import React from 'react'

import PageHeader from '../../../components/structure/PageHeader'
import Panel from '../../../components/structure/Panel'
import SearchResultData from './SearchResultData'
import SideMenuTemplate from '../../../templates/SideMenuTemplate'

const SearchResultPage = () => (
  <SideMenuTemplate>
    <PageHeader title="Resultado da busca" />
    <Panel noPadding flex={1}>
      <SearchResultData />
    </Panel>
  </SideMenuTemplate>
)

export default SearchResultPage
