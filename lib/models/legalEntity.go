package models

// TODO: Define values
var LEGAL_ENTITY_TYPES = map[string]string{
	"a": "a",
	"b": "b",
}

type LegalEntity struct {
	legalEntityType string `json:"legalEntityType"`
	Shareholders    []Participation
	Administrators  []Participation
	Entity
}

func (l *LegalEntity) AfterInit() {
	l.EntityType = ENTITY_TYPES["legal"]
}

func (l *LegalEntity) BeforeSave() {
	l.Entity.BeforeSave()
}

func (l *LegalEntity) FillAssociations(ps []Participation) {
	l.FillShareholders(ps)
	l.FillAdministrators(ps)
}

func (l *LegalEntity) FillShareholders(ps []Participation) {
	if len(l.Shareholders) > 0 {
		return
	}

	isShareholderAndRelatedToEntity := func(p Participation) bool {
		return p.IsShareholderOrBoth() && p.LegalEntityID == l.ID
	}

	l.Shareholders = FilterParticipations(ps, isShareholderAndRelatedToEntity)
}

func (l *LegalEntity) FillAdministrators(ps []Participation) {
	if len(l.Administrators) > 0 {
		return
	}

	isAdministratorAndRelatedToEntity := func(p Participation) bool {
		return p.IsAdministratorOrBoth() && p.LegalEntityID == l.Entity.ID
	}

	l.Administrators = FilterParticipations(ps, isAdministratorAndRelatedToEntity)
}

func (l *LegalEntity) HasShareholder(s LegalEntity) bool {
	for _, p := range l.Shareholders {
		if p.AssociatedEntityID != nil && *p.AssociatedEntityID == s.ID {
			return true
		}
	}
	return false
}
