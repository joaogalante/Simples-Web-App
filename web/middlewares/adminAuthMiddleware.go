package middlewares

import (
	"net/http"
)

func AdminAuthMiddleware(rw http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	// TODO: Check if admin
	// if r.URL.Query().Get("password") == "secret123" {
	next(rw, r)
	// } else {
	// http.Error(rw, "Not Authorized", 401)
	// }
}
