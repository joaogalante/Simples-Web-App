import {Route} from 'react-router'
import React from 'react'

import ControlPage from './views/controls/show/ControlPage'
import ControlReadersLogsPage from
  './views/controls/readersLogs/ControlReadersLogsPage'
import ControlsPage from './views/controls/list/ControlsPage'
import EditControlPage from './views/controls/edit/EditControlPage'
import EditIndividualEntityInfoPage from './views/individualEntities/edit/EditIndividualEntityInfoPage'
import EditLegalEntityInfoPage from './views/legalEntities/edit/EditLegalEntityInfoPage'
import EditLegalEntityParticipationsPage from './views/legalEntities/edit/EditLegalEntityParticipationsPage'
import IndividualEntitiesPage from './views/individualEntities/list/IndividualEntitiesPage'
import IndividualEntityPage from './views/individualEntities/show/IndividualEntityPage'
import LegalEntitiesPage from './views/legalEntities/list/LegalEntitiesPage'
import LegalEntityPage from './views/legalEntities/show/LegalEntityPage'
import LoginPage from './views/session/login/LoginPage'
import NewControlPage from './views/controls/new/NewControlPage'
import NewIndividualEntityCodePage from './views/individualEntities/new/NewIndividualEntityCodePage'
import NewIndividualEntityInfoPage from './views/individualEntities/new/NewIndividualEntityInfoPage'
import NewLegalEntityCodePage from './views/legalEntities/new/NewLegalEntityCodePage'
import NewLegalEntityInfoPage from './views/legalEntities/new/NewLegalEntityInfoPage'
import RequestPasswordPage from './views/session/requestPassword/RequestPasswordPage'
import SearchResultPage from './views/search/result/SearchResultPage'
import ValidateIndividualEntityPage from './views/individualEntities/validate/ValidateIndividualEntityPage'
import ValidateLegalEntityCompositionPage from './views/legalEntities/validateComposition/ValidateLegalEntityCompositionPage'
import ValidateLegalEntityPage from './views/legalEntities/validate/ValidateLegalEntityPage'

const Routes = () => (
  <div className="page-wrapper">
    <Route exact path="/" component={LegalEntitiesPage} />
    <Route exact path="/legal-entities/:id/show" component={LegalEntityPage} />
    <Route exact path="/legal-entities/new" component={NewLegalEntityCodePage} />
    <Route exact path="/legal-entities/new-info" component={NewLegalEntityInfoPage} />
    <Route exact path="/legal-entities/:id/edit" component={EditLegalEntityInfoPage} />
    <Route exact path="/legal-entities/:id/edit-participations" component={EditLegalEntityParticipationsPage} />
    <Route exact path="/legal-entities/:id/validate" component={ValidateLegalEntityPage} />
    <Route exact path="/legal-entities/:id/validate-composition" component={ValidateLegalEntityCompositionPage} />

    <Route exact path="/individual-entities/:id/show" component={IndividualEntityPage} />
    <Route exact path="/individual-entities/new" component={NewIndividualEntityCodePage} />
    <Route exact path="/individual-entities/new-info" component={NewIndividualEntityInfoPage} />
    <Route exact path="/individual-entities" component={IndividualEntitiesPage} />
    <Route exact path="/individual-entities/:id/edit" component={EditIndividualEntityInfoPage} />
    <Route exact path="/individual-entities/:id/validate" component={ValidateIndividualEntityPage} />

    <Route exact path="/controls" component={ControlsPage} />
    <Route exact path="/legal-entities/:legalEntityID/new-control" component={NewControlPage} />
    <Route exact path="/controls/:id/edit" component={EditControlPage} />
    <Route exact path="/controls/:id/show" component={ControlPage} />
    <Route exact path="/controls/:id/readers-logs" component={ControlReadersLogsPage} />

    <Route exact path="/search" component={SearchResultPage} />

    <Route path="/login" component={LoginPage} />
    <Route path="/request-password" component={RequestPasswordPage} />
  </div>
)

export default Routes
