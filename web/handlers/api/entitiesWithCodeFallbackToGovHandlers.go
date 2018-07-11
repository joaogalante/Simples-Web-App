package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

func GetEntitiesWithCodeFallbackToGovResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /entity-with-code-fallback-to-gov/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		code, _ := vars["id"]
		e, err := models.ShowEntityWithCode(db, code)
		var l models.LegalEntity

		if err != nil {
			l, _ = models.ShowLegalEntityWithCodeOnGovApi(code)
		}

		if e.ID > 0 {
			wh.RespondWithJSON(w, http.StatusOK, e)
		} else {
			wh.RespondWithJSON(w, http.StatusOK, l)
		}
	}

	return resource.Model{nil, show, nil, nil, nil}
}
