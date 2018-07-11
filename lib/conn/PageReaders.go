package conn

import (
	"bytes"
	"encoding/json"
	"fin/lib/models"
	"io"
	"io/ioutil"
	"strconv"

	"github.com/cinn-labs/lg"
)

const (
	GroupSearchApi = "searches"
)

type PageReaders []*PageReader

func InitPageReadersFromEntities(l []models.Entity) *PageReaders {
	eprs := []*PageReader{}
	for _, e := range l {
		epr := InitPageReader(strconv.Itoa(e.ID), "google", map[string]interface{}{"q": e.Name})
		eprs = append(eprs, epr)
	}
	pr := InitPageReaders(eprs)
	return pr
}

func InitPageReaders(rs []*PageReader) *PageReaders {
	prs := PageReaders(rs)
	return &prs
}

func (rs *PageReaders) toBody() io.Reader {
	uds := []map[string]interface{}{}
	for _, r := range *rs {
		uds = append(uds, r.GenerateBodyMap())
	}

	b := new(bytes.Buffer)
	json.NewEncoder(b).Encode(map[string][]map[string]interface{}{
		"searches": uds,
	})
	return b
}

func (rs *PageReaders) SetLogUrls() {
	for _, r := range *rs {
		r.SetLogUrl()
	}
}

func (rs *PageReaders) Connect() error {
	client, req := SetPageReaderClient(GroupSearchApi, "POST", rs.toBody())
	res, err := client.Do(req)
	if err != nil {
		lg.Error(err)
		return err
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	json.Unmarshal(body, rs)
	rs.SetLogUrls()

	return nil
}
