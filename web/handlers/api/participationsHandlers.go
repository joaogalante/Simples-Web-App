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

func GetParticipationsResource(db *sql.DB, auth *auth.Model) resource.Model {
	// POST /participations
	create := func(w http.ResponseWriter, r *http.Request) {
		var p models.Participation
		if wh.BodyToModel(w, r.Body, &p) {
			return
		}

		if validations, err := models.CreateParticipation(db, &p); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, p)
	}

	// PUT /participations/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		var p models.Participation
		if wh.BodyToModel(w, r.Body, &p) {
			return
		}

		if validations, err := models.UpdateParticipation(db, id, &p); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, p)
	}

	// DELETE /participations/:id
	delete := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		if err := models.DeleteParticipation(db, id); err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithEmptySuccess(w)
	}

	return resource.Model{nil, nil, create, update, delete}
}
