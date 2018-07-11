package web

import (
	apiHandlers "fin/web/handlers/api"
	pubHandlers "fin/web/handlers/public"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/server"
	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

func InitRoutes(s server.Server) {
	// PUBLIC
	resource.Generate("/session", pubHandlers.GetSessionResource(s.DB, s.Auth), s.Router)
	resource.GenerateWithStringId("/password", pubHandlers.GetUserPasswordResource(s.DB, s.Auth), s.Router)

	s.Router.PathPrefix(pubHandlers.TMP_DIR).Handler(pubHandlers.GetTmpFolderHandler())

	// API
	apiRouter := mux.NewRouter().PathPrefix("/api").Subrouter().StrictSlash(true)
	resource.Generate("/legal", apiHandlers.GetLegalEntitiesResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/individuals", apiHandlers.GetIndividualsEntitiesResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls", apiHandlers.GetControlsResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/refresh-control-instance-date", apiHandlers.GetRefreshControlInstanceDateResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls/{controlID:[0-9]+}/entities", apiHandlers.GetEntitiesOnControlResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls/{controlID:[0-9]+}/entities-folder-structure", apiHandlers.GetEntitiesFolderStructureForControlResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls/{controlID:[0-9]+}/compress-entities-folder-structure", apiHandlers.GetCompressEntitiesFolderStructureForControlResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls/{controlID:[0-9]+}/connect-page-readers", apiHandlers.GetConnectPageReadersForControlResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/countries", apiHandlers.GetCountriesResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/search", apiHandlers.GetGlobalSearchResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/job-titles", apiHandlers.GetJobTitlesResource(s.DB, s.Auth), apiRouter)
	resource.GenerateWithStringId("/entities-with-name-and-type", apiHandlers.GetEntitiesWithNameAndTypeResource(s.DB, s.Auth), apiRouter)

	resource.GenerateWithStringId("/entity-with-code", apiHandlers.GetEntitiesWithCodeResource(s.DB, s.Auth), apiRouter)
	resource.GenerateWithStringId("/entity-with-code-fallback-to-gov", apiHandlers.GetEntitiesWithCodeFallbackToGovResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/refresh-entity-revised-at", apiHandlers.GetRefreshEntityRevisedAtResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/entity/{entityID:[0-9]+}/participations-for-associated-entity", apiHandlers.GetParticipationsForAssociatedEntityResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/legal/{entityID:[0-9]+}/participations-composition-for-legal-entity", apiHandlers.GetParticipationsCompositionForLegalEntityResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/legal/{entityID:[0-9]+}/expired-entities-on-composition", apiHandlers.GetLegalEntityExpiredEntitiesOnCompositionHandlers(s.DB, s.Auth), apiRouter)
	resource.Generate("/legal/{entityID:[0-9]+}/count-expired-entities-on-composition", apiHandlers.GetCountLegalEntityExpiredEntitiesOnCompositionHandlers(s.DB, s.Auth), apiRouter)
	resource.Generate("/legal/{entityID:[0-9]+}/participations-for-legal-entity", apiHandlers.GetParticipationsForLegalEntityResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/legal/{entityID:[0-9]+}/controls", apiHandlers.GetControlsForLegalEntityResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/control-report", apiHandlers.GetControlReportResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/controls-entities-report", apiHandlers.GetControlsEntitiesReportResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/participations", apiHandlers.GetParticipationsResource(s.DB, s.Auth), apiRouter)
	resource.Generate("/participations-sorts", apiHandlers.GetParticipationsSortsResource(s.DB, s.Auth), apiRouter)

	// WRAP SUB ROUTERS
	combineApiSubrouterWithMiddlewares(s.Router, apiRouter, s.Auth)
}

func combineApiSubrouterWithMiddlewares(r *mux.Router, apiRouter *mux.Router, auth *auth.Model) {
	r.PathPrefix("/api").Handler(negroni.New(
		negroni.HandlerFunc(auth.AuthMiddleware),
		negroni.Wrap(apiRouter),
	))
}
