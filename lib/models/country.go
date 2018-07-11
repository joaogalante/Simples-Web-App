package models

type Country struct {
	ID     int     `json:"id"`
	Name   string  `json:"name"`
	NamePT string  `json:"namePT"`
	Code   *string `json:"code"`
	Sort   int     `json:"sort"`
}

type CountryQueryModel struct {
	ID     *int    `json:"id"`
	Name   *string `json:"name"`
	NamePT *string `json:"namePT"`
	Code   *string `json:"code"`
	Sort   *int    `json:"sort"`
}

func (cqm *CountryQueryModel) ToCountry() *Country {
	if cqm.ID != nil && cqm.NamePT != nil {
		return &Country{ID: *cqm.ID, NamePT: *cqm.NamePT, Code: cqm.Code}
	}
	return nil
}
