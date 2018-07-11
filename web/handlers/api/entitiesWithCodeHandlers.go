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

func GetEntitiesWithCodeResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /entity-with-code/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		code, _ := vars["id"]
		e, err := models.ShowEntityWithCode(db, code)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, e)
	}

	return resource.Model{nil, show, nil, nil, nil}
}
