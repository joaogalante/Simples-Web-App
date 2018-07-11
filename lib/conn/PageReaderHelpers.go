package conn

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

const LOGS_PATH = "tmp"

func SetPageReaderClient(path, method string, body io.Reader) (*http.Client, *http.Request) {
	api := fmt.Sprintf("%s/%s/%s", os.Getenv("READER_API"), "api", path)
	token := os.Getenv("READER_API_TOKEN")

	timeout := time.Duration(4 * time.Second)
	client := &http.Client{Timeout: timeout}
	req, _ := http.NewRequest(method, api, body)
	req.Header.Set("Auth", token)
	return client, req
}
