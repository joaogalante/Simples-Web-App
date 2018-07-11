package conn

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/cinn-labs/lg"
)

const (
	searchApi = "search"
)

type PageReader struct {
	FlowName string
	Params   map[string]interface{}

	Token    string `json:"token"`
	CustomID string `json:"customID"`
	LogUrl   string

	Response string
	Error    string
}

func InitPageReader(cid string, fn string, p map[string]interface{}) *PageReader {
	return &PageReader{CustomID: cid, FlowName: fn, Params: p}
}

func (r *PageReader) GenerateBodyMap() map[string]interface{} {
	return map[string]interface{}{
		"flowName": r.FlowName,
		"params":   r.Params,
		"customID": r.CustomID,
	}
}

func (r *PageReader) toBody() io.Reader {
	ud := r.GenerateBodyMap()
	b := new(bytes.Buffer)
	json.NewEncoder(b).Encode(ud)
	return b
}

func (r *PageReader) SetLogUrl() {
	api := os.Getenv("READER_API")
	r.LogUrl = fmt.Sprintf("%s/%s/%s.log", api, LOGS_PATH, r.Token)
}

func (r *PageReader) Connect() error {
	client, req := SetPageReaderClient(searchApi, "POST", r.toBody())
	res, err := client.Do(req)
	if err != nil {
		lg.Error(err)
		return err
	}

	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	json.Unmarshal(body, r)
	r.SetLogUrl()

	return nil
}

func (r *PageReader) GetResult() {
	// TODO: Call api and set response and error
}
