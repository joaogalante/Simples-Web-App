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

func GetCompressEntitiesFolderStructureForControlResource(db *sql.DB, auth *auth.Model) resource.Model {
	// GET /controls/:controlID/compress-entities-folder-structure
	index := func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, _ := strconv.Atoi(vars["controlID"])

		l, err := models.ListEntitiesOnControl(db, id)

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		var filePath string
		fs := models.GenerateEntitiesFolderStructure(l)
		filePath, err = fs.Compress()

		if err != nil {
			wh.RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		wh.RespondWithJSON(w, http.StatusOK, map[string]string{"filePath": filePath})
	}

	return resource.Model{index, nil, nil, nil, nil}
}
