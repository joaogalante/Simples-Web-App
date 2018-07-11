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

func GetIndividualsEntitiesResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /individuals
	index := func(w http.ResponseWriter, r *http.Request) {
		m, err := models.ListIndividualEntities(db)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	// GET /individuals/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])
		m, err := models.ShowIndividualEntity(db, id)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	// POST /individuals
	create := func(w http.ResponseWriter, r *http.Request) {
		var m models.IndividualEntity
		if wh.BodyToModel(w, r.Body, &m) {
			return
		}

		if validations, err := models.CreateIndividualEntity(db, &m); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, m)
	}

	// PUT /individuals/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		var m models.IndividualEntity
		if wh.BodyToModel(w, r.Body, &m) {
			return
		}

		if validations, err := models.UpdateIndividualEntity(db, id, &m); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, m)
	}

	return resource.Model{index, show, create, update, nil}
}
