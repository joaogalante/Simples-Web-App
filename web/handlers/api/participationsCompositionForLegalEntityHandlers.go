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

func GetParticipationsCompositionForLegalEntityResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /legal/:entityID/participations-composition-for-legal-entity
	index := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["entityID"])
		cid, _ := strconv.Atoi(r.URL.Query().Get("controlID"))

		l, err := models.ListParticipationsCompositionForForLegalEntity(db, id, cid)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, l)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
