package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
)

func GetGlobalSearchResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /search
	index := func(w http.ResponseWriter, r *http.Request) {
		q := r.URL.Query().Get("q")
		m, err := models.ListGlobalSearch(db, q)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
