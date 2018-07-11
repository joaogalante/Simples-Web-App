package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
)

func GetJobTitlesResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /job-titles
	index := func(w http.ResponseWriter, r *http.Request) {
		m, err := models.ListJobTitles(db)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
