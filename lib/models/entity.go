package models

import (
	"fin/lib/helpers"
	"time"
)

var ENTITY_TYPES = map[string]string{
	"legal":      "legal",
	"individual": "individual",
}

type Entity struct {
	ID            int        `json:"id"`
	Name          string     `json:"name"`
	Code          *string    `json:"code"`
	EntityType    string     `json:"entityType"`
	Country       *Country   `json:"country"`
	CountryID     *int       `json:"countryID"`
	FromGovApi    bool       `json:"fromGovApi"`
	LastMentionAt *time.Time `json:"lastMentionAt"`
	RevisedAt     *time.Time `json:"revisedAt"`
	BornAt        *time.Time `json:"bornAt"`
	AddressID     int        `json:"addressID"`
	Address       Address    `json:"address"`
	LastControl   *Control   `json:"lastControl"`
}

func (e *Entity) BeforeSave() {
	if e.Code != nil {
		*e.Code = helpers.GetOnlyNumbersFrom(*e.Code)
	}
}

func (m *Entity) IsLegal() bool {
	return m.EntityType == ENTITY_TYPES["legal"]
}

func (m *Entity) IsIndividual() bool {
	return m.EntityType == ENTITY_TYPES["individual"]
}

func (m *Entity) LastMentionInLessThenSixMonths() bool {
	if m.LastMentionAt == nil {
		return false
	}
	te := time.Now()
	tb := te.AddDate(0, -6, 0)
	return m.LastMentionAt.Before(te) && m.LastMentionAt.After(tb)
}

func (m *Entity) GetCodeOrDefault(dfl string, dfi string, dfg string) (string, bool) {
	if m.Code == nil || *m.Code == "" {
		if m.IsLegal() {
			return dfl, false
		}
		if m.IsIndividual() {
			return dfi, false
		}

		return dfg, false
	}

	return *m.Code, true
}

func (m *Entity) GetFormattedCodeOrDefault(dfl string, dfi string, dfg string) string {
	c, ok := m.GetCodeOrDefault(dfl, dfi, dfg)
	if ok == false {
		return c
	}
	return helpers.FormatEntityCode(c)
}

func (m *Entity) GetFormattedCodeOrEmptyMessage() string {
	return m.GetFormattedCodeOrDefault("Sem CNPJ", "Sem CPF", "Sem CNPJ/CPF")
}

func (m *Entity) GetFormattedCodeOrPlaceholder() string {
	return m.GetFormattedCodeOrDefault("XX.XXX.XXX/XXXX-XX", "XXX.XXX.XXX-XX", "")
}

func (m *Entity) GetCodeOrPlaceholder() string {
	c, _ := m.GetCodeOrDefault("XXXXXXXXXXXXXX", "XXXXXXXXXXX", "")
	return c
}

func (m *Entity) IsFromUSA() bool {
	if m.CountryID != nil && *m.CountryID == helpers.USA_ID {
		return true
	}
	return false
}

func (m *Entity) IsFromBrazil() bool {
	if m.CountryID != nil && *m.CountryID == helpers.BRAZIL_ID {
		return true
	}
	return false
}

func (e *Entity) IsInList(es []Entity) bool {
	for _, ie := range es {
		if ie.ID == e.ID {
			return true
		}
	}
	return false
}

func (e *Entity) IsInLegalList(ls []LegalEntity) bool {
	for _, l := range ls {
		if l.ID == e.ID {
			return true
		}
	}
	return false
}

func SeparateEntitiesByType(es []Entity) (ls []LegalEntity, is []IndividualEntity) {
	for _, e := range es {
		isLegal := e.IsLegal()
		isIndividual := !isLegal

		if isLegal {
			l := LegalEntity{Entity: e}
			l.AfterInit()
			ls = append(ls, l)
		} else if isIndividual {
			i := IndividualEntity{Entity: e}
			i.AfterInit()
			is = append(is, i)
		}
	}
	return ls, is
}
