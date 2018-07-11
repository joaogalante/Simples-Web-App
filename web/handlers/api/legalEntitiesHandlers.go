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

func GetLegalEntitiesResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /legal
	index := func(w http.ResponseWriter, r *http.Request) {
		l, err := models.ListLegalEntities(db)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, l)
	}

	// GET /legal/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])
		l, err := models.ShowLegalEntity(db, id)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, l)
	}

	// POST /legal
	create := func(w http.ResponseWriter, r *http.Request) {
		var l models.LegalEntity
		if wh.BodyToModel(w, r.Body, &l) {
			return
		}

		if validations, err := models.CreateLegalEntity(db, &l); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, l)
	}

	// PUT /legal/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		var l models.LegalEntity
		if wh.BodyToModel(w, r.Body, &l) {
			return
		}

		if validations, err := models.UpdateLegalEntity(db, id, &l); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, l)
	}

	return resource.Model{index, show, create, update, nil}
}
