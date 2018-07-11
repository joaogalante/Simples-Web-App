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

func GetControlsResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /controls
	index := func(w http.ResponseWriter, r *http.Request) {
		m, err := models.ListControls(db)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	// GET /controls/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])
		m, err := models.ShowControl(db, id)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, m)
	}

	// POST /controls
	create := func(w http.ResponseWriter, r *http.Request) {
		var m models.Control
		if wh.BodyToModel(w, r.Body, &m) {
			return
		}

		if validations, err := models.CreateControl(db, &m); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, m)
	}

	// PUT /controls/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		var m models.Control
		if wh.BodyToModel(w, r.Body, &m) {
			return
		}

		if validations, err := models.UpdateControl(db, id, &m); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, m)
	}

	// DELETE /controls/:id
	delete := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		if err := models.DeleteControl(db, id); err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithEmptySuccess(w)
	}

	return resource.Model{index, show, create, update, delete}
}
