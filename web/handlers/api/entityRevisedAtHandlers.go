package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"
	"strconv"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

func GetRefreshEntityRevisedAtResource(db *sql.DB, auth *auth.Model) resource.Model {
	// PUT /refresh-entity-revised-at/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		if err := models.RefreshEntityRevisedAt(db, id); err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithEmptySuccess(w)
	}

	return resource.Model{nil, nil, nil, update, nil}
}
