package handlers

import (
	"database/sql"
	"fin/lib/models"
	"fin/lib/reports"
	"net/http"
	"strconv"

	"github.com/cinn-labs/auth"
	"github.com/cinn-labs/resource"
	"github.com/cinn-labs/wh"
	"github.com/gorilla/mux"
)

func GetControlsEntitiesReportResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /controls-entities-report/:id
	show := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["id"])
		c, err := models.ShowControl(db, id)
		es, err := models.ListEntitiesOnControl(db, id)
		var filePath string

		if err == nil {
			report := reports.GenerateControlsEntitiesReport(c, es)
			filePath, err = report.GenerateExcel()
		}

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, map[string]string{"filePath": filePath})
	}

	return resource.Model{nil, show, nil, nil, nil}
}
