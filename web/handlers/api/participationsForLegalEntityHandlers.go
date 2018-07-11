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

func GetParticipationsForLegalEntityResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /entity/:entityID/participations-for-legal-entity
	index := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["entityID"])

		l, err := models.ListParticipationsForLegalEntity(db, id)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, l)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
