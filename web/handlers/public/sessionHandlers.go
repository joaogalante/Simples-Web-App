package handlers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
)

var mySigningKey = []byte("My Secret")

func GetSessionResource(db *sql.DB, auth *auth.Model) resource.Model {
	// POST /session
	create := func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		if wh.BodyToModel(w, r.Body, &user) {
			return
		}

		if validations, err := models.ShowUserByEmailAndPass(db, &user); err != nil {
			wh.RespondWithValidationsError(w, http.StatusInternalServerError, err.Error(), validations)
			return
		}

		user.AuthToken, _ = auth.GenerateToken(map[string]interface{}{"ID": user.ID})

		wh.RespondWithJSON(w, http.StatusCreated, user)
	}

	// DELETE /session/:id
	delete := func(w http.ResponseWriter, r *http.Request) {
		// TODO
		wh.RespondWithEmptySuccess(w)
	}

	return resource.Model{nil, nil, create, nil, delete}
}
