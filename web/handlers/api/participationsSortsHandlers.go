package handlers

import (
	"database/sql"
	"fin/lib/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

type ParticipationSortUpdateBody struct {
	Sort int `json:"sort"`
}

func GetParticipationsSortsResource(db *sql.DB, auth *auth.Model) resource.Model {
	// PUT /participations-sorts/:id
	update := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])

		var b ParticipationSortUpdateBody
		if wh.BodyToModel(w, r.Body, &b) {
			return
		}

		fmt.Println(id, b)

		if err := models.UpdateParticipationSort(db, id, b.Sort); err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusCreated, b)
	}

	return resource.Model{nil, nil, nil, update, nil}
}
