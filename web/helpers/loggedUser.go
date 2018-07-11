package helpers

import (
	"database/sql"
	"fin/lib/models"
	"net/http"

	"github.com/cinn-labs/auth"
)

func GetLoggedUserID(auth *auth.Model, r *http.Request) int {
	token := auth.GetAuthTokenByRequest(r)
	return auth.GetIDFromTokenClaims(auth, token, "ID")
}

func GetLoggedUser(db *sql.DB, auth *auth.Model, r *http.Request) (models.User, error) {
	userID := GetLoggedUserID(auth, r)
	return models.ShowUser(db, userID)
}

func GetLoggedGroupID(db *sql.DB, auth *auth.Model, r *http.Request) int {
	token := auth.GetAuthTokenByRequest(r)
	return auth.GetIDFromTokenClaims(auth, token, "GroupID")
}
