package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

func GetUserPasswordResource(db *sql.DB, auth *auth.Model) resource.Model {
	// PUT /password/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		token, _ := vars["id"]

		var user models.User
		if wh.BodyToModel(w, r.Body, &user) {
			return
		}

		if validations, err := models.CreateUserPassword(db, token, &user); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, user)
	}
	return resource.Model{nil, nil, nil, update, nil}
}
