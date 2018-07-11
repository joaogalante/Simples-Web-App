package models

import (
	"strings"

	pg "github.com/lib/pq"
)

var PARTICIPATION_TYPES = map[string]string{
	"shareholder":   "shareholder",
	"administrator": "administrator",
	"both":          "both",
}

var SHAREHOLDER_TYPES = map[string]string{
	"entity":       "entity",
	"circulation":  "circulation",
	"unidentified": "unidentified",
	"open":         "open",
}

type Participation struct {
	ID                   int             `json:"id"`
	ParticipationType    string          `json:"participationType"`
	ShareholderType      string          `json:"shareholderType"`
	LegalEntity          LegalEntity     `json:"legalEntity"`
	LegalEntityID        int             `json:"legalEntityID"`
	AssociatedEntity     Entity          `json:"associatedEntity"`
	AssociatedEntityID   *int            `json:"associatedEntityID"`
	Percentage           *float64        `json:"percentage"`
	Quotas               *int            `json:"quotas"`
	CalculatedPercentage float64         `json:"calculatedPercentage"`
	Description          *string         `json:"description"`
	JobTitles            *pg.StringArray `json:"jobTitles"`
	Sort                 int             `json:"sort"`
}

func (p *Participation) GetQuotasOrZero() int {
	if p.Quotas != nil {
		return *p.Quotas
	}
	return 0
}

func (p *Participation) GetPercentageOrZero() float64 {
	if p.Percentage != nil {
		return *p.Percentage
	}
	return 0.0
}

func (p *Participation) IsShareholderOrBoth() bool {
	return p.ParticipationType == PARTICIPATION_TYPES["shareholder"] || p.ParticipationType == PARTICIPATION_TYPES["both"]
}

func (p *Participation) IsAdministratorOrBoth() bool {
	return p.ParticipationType == PARTICIPATION_TYPES["administrator"] || p.ParticipationType == PARTICIPATION_TYPES["both"]
}

func (p *Participation) IsAssociatedWithAnEntity() bool {
	return p.ShareholderType == SHAREHOLDER_TYPES["entity"]
}

func (p *Participation) IsTreasury() bool {
	if p.AssociatedEntityID == nil {
		return false
	}
	return *p.AssociatedEntityID == p.LegalEntityID
}

func (p *Participation) IsCirculation() bool {
	return p.ShareholderType == SHAREHOLDER_TYPES["circulation"]
}

func (p *Participation) IsUnidentified() bool {
	return p.ShareholderType == SHAREHOLDER_TYPES["unidentified"]
}

func (p *Participation) GetJobTitlesPGFormat() string {
	if p.JobTitles == nil {
		return "{}"
	}
	return "{" + strings.Join((*p.JobTitles), ", ") + "}"
}

func (p *Participation) GetAssociatedEntityCodeOrEmptyMessage() string {
	if p.IsAssociatedWithAnEntity() && p.AssociatedEntity.ID != 0 {
		return p.AssociatedEntity.GetFormattedCodeOrEmptyMessage()
	}
	return "N/A"
}

func (p *Participation) GetAssociatedEntityNameOrParticipationDefinition() string {
	if p.IsAssociatedWithAnEntity() && p.AssociatedEntity.ID != 0 {
		if p.IsTreasury() {
			return "Ações em Tesouraria"
		}
		return p.AssociatedEntity.Name
	}
	if p.IsCirculation() {
		return "Ações em Circulação"
	}
	if p.IsUnidentified() {
		if p.Description != nil {
			return *p.Description
		}
		return "Acionistas não Identificados"
	}
	return "N/A"
}

// Used to clean deleted participations that somehow are comming on the query
// TODO: Fix query and remove this function
func CleanParticipationsWithoutAssociationOnComposition(ps []Participation, rootID int, fps *[]Participation) {
	for _, p := range ps {
		if p.LegalEntityID == rootID {
			cp := FindParticipationByID(*fps, p.ID)
			if cp.ID == 0 {
				*fps = append(*fps, p)
				if p.IsAssociatedWithAnEntity() {
					CleanParticipationsWithoutAssociationOnComposition(ps, *p.AssociatedEntityID, fps)
				}
			}
		}
	}

}

func FilterParticipations(ps []Participation, check func(Participation) bool) (nps []Participation) {
	for _, p := range ps {
		if check(p) {
			nps = append(nps, p)
		}
	}
	return
}

func FindParticipationByID(ps []Participation, id int) (pa Participation) {
	for _, p := range ps {
		if p.ID == id {
			pa = p
		}
	}
	return pa
}
