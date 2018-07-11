package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
)

func GetEntitiesWithNameAndTypeResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /entities-with-name-and-type
	index := func(w http.ResponseWriter, r *http.Request) {
		params := r.URL.Query()
		q := params.Get("q")
		entityType := params.Get("type")
		es, err := models.ListEntitiesWithNameAndType(db, q, entityType)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, es)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
