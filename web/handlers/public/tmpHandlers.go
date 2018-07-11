package handlers

import (
	"net/http"
	"strings"
)

const TMP_DIR = "/tmp/"

func noDirListing(h http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "" || strings.HasSuffix(r.URL.Path, "/") {
			http.NotFound(w, r)
			return
		}
		h.ServeHTTP(w, r)
	})
}

func GetTmpFolderHandler() http.Handler {
	return http.StripPrefix(TMP_DIR, noDirListing(http.FileServer(http.Dir("."+TMP_DIR))))
}
