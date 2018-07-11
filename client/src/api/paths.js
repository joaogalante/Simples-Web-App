const paths = {
  login: {path: 'session', method: 'POST'},
  logout: {path: 'session', method: 'DESTROY'},

  getEntityWithCode: {path: 'api/entity-with-code/:code', method: 'GET'},
  getExpiredEntitiesOnComposition: {path: 'api/legal/:id/expired-entities-on-composition', method: 'GET'},
  countExpiredEntitiesOnComposition: {path: 'api/legal/:id/count-expired-entities-on-composition', method: 'GET'},
  getEntityWithCodeFallbackToGov: {path: 'api/entity-with-code-fallback-to-gov/:code', method: 'GET'},
  getEntitiesWithNameAndType: {path: 'api/entities-with-name-and-type?q=:q&type=:type', method: 'GET'},
  refreshEntityRevisedAt: {path: 'api/refresh-entity-revised-at/:id', method: 'PUT'},

  getLegalEntities: {path: 'api/legal', method: 'GET'},
  getLegalEntity: {path: 'api/legal/:id', method: 'GET'},
  createLegalEntity: {path: 'api/legal', method: 'POST'},
  updateLegalEntity: {path: 'api/legal/:id', method: 'PUT'},

  getIndividualEntities: {path: 'api/individuals', method: 'GET'},
  getIndividualEntity: {path: 'api/individuals/:id', method: 'GET'},
  createIndividualEntity: {path: 'api/individuals', method: 'POST'},
  updateIndividualEntity: {path: 'api/individuals/:id', method: 'PUT'},

  getControls: {path: 'api/controls', method: 'GET'},
  getControlsForLegalEntity: {path: 'api/legal/:legalEntityID/controls', method: 'GET'},
  getControl: {path: 'api/controls/:id', method: 'GET'},
  getEntitiesOnControl: {path: 'api/controls/:id/entities', method: 'GET'},
  getEntitiesFolderStructureForControl: {path: 'api/controls/:id/entities-folder-structure', method: 'GET'},
  getCompressEntitiesFolderStructureForControl: {path: 'api/controls/:id/compress-entities-folder-structure', method: 'GET'},
  connectPageReadersForControl: {path: 'api/controls/:id/connect-page-readers', method: 'GET'},
  createControl: {path: 'api/controls', method: 'POST'},
  updateControl: {path: 'api/controls/:id', method: 'PUT'},
  deleteControl: {path: 'api/controls/:id', method: 'DELETE'},
  refreshControlInstanceDate: {path: 'api/refresh-control-instance-date/:id', method: 'PUT'},

  generateControlExcel: {path: 'api/control-report/:id', method: 'GET'},
  generateControlsEntitiesExcel: {path: 'api/controls-entities-report/:id', method: 'GET'},

  getParticipationsForAssociatedEntity: {path: 'api/entity/:id/participations-for-associated-entity', method: 'GET'},
  getParticipationsForLegalEntity: {path: 'api/legal/:id/participations-for-legal-entity', method: 'GET'},
  getParticipationsCompositionForLegalEntity: {
    path: 'api/legal/:id/participations-composition-for-legal-entity?controlID=:controlID',
    method: 'GET',
  },
  createParticipation: {path: 'api/participations', method: 'POST'},
  updateParticipation: {path: 'api/participations/:id', method: 'PUT'},
  deleteParticipation: {path: 'api/participations/:id', method: 'DELETE'},
  updateParticipationsSorts: {path: 'api/participations-sorts/:id', method: 'PUT'},

  getCountries: {path: 'api/countries?q=:q', method: 'GET'},
  getJobTitles: {path: 'api/job-titles', method: 'GET'},

  search: {path: 'api/search?q=:q', method: 'GET'},
}

export default paths
