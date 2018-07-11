package handlers

import (
	"database/sql"
	"fin/lib/conn"
	"fin/lib/models"
	"net/http"
	"strconv"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

func GetConnectPageReadersForControlResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /controls/:controlID/connect-page-readers-for-control
	index := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["controlID"])

		l, err := models.ListEntitiesOnControl(db, id)
		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		pr := conn.InitPageReadersFromEntities(l)
		err = pr.Connect()

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, pr)
	}

	return resource.Model{index, nil, nil, nil, nil}
}
