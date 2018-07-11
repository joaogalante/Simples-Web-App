package models

import (
	"encoding/json"
	"fin/lib/helpers"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/Nhanderu/brdoc"
)

const GOV_API = "https://receitaws.com.br/v1/cnpj/"

type LegalEntityJsonReponse struct {
	Nome        string  `json:"nome"`
	Logradouro  *string `json:"logradouro"`
	UF          *string `json:"uf"`
	Complemento *string `json:"complemento"`
	Bairro      *string `json:"bairro"`
	Numero      *string `json:"numero"`
	Municipio   *string `json:"municipio"`
	CEP         *string `json:"cep"`
	Abertura    *string `json:"abertura"`
}

func dateStringToTime(date *string) *time.Time {
	if date == nil {
		return nil
	}
	layout := "02/01/2006"
	f, e := time.Parse(layout, *date)
	if e != nil {
		return nil
	}
	return &f
}

func ShowLegalEntityWithCodeOnGovApi(code string) (m LegalEntity, err error) {
	var response *http.Response
	var body []byte
	var data LegalEntityJsonReponse

	if !brdoc.IsCNPJ(code) {
		return
	}

	timeout := time.Duration(4 * time.Second)
	client := http.Client{
		Timeout: timeout,
	}

	response, err = client.Get(GOV_API + helpers.GetOnlyNumbersFrom(code))

	if err == nil {
		body, _ = ioutil.ReadAll(response.Body)
		json.Unmarshal(body, &data)
		countryID := helpers.BRAZIL_ID

		if data.Nome != "" {
			m = LegalEntity{
				Entity: Entity{
					Name:       helpers.CapitalizeString(data.Nome),
					Code:       &code,
					FromGovApi: true,
					CountryID:  &countryID,
					BornAt:     dateStringToTime(data.Abertura),
					Address: Address{
						Name:       helpers.CapitalizeOptionalString(data.Logradouro),
						Region:     helpers.CapitalizeOptionalString(data.Bairro),
						City:       helpers.CapitalizeOptionalString(data.Municipio),
						Complement: helpers.CapitalizeOptionalString(data.Complemento),
						State:      data.UF,
						Postal:     data.CEP,
						Num:        data.Numero,
					},
				},
			}
			m.AfterInit()
		}
	}

	return
}
