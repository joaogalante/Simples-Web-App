package reports

import (
	ex "fin/lib/excel"
	"fin/lib/models"
	"strings"
)

type ControlExcelReportFiller struct {
	f     *ex.ExcelFiller
	c     models.Control
	lc    int
	ic    int
	ls    []models.LegalEntity
	ueids []int // Ids of used entities to check if repeats on the same file
}

func InitControlExcelReportFiller(control models.Control, participations []models.Participation) ControlExcelReportFiller {
	r := ControlExcelReportFiller{}
	r.c = control
	r.ueids = []int{control.LegalEntityID}
	r.ls, r.lc, r.ic = FormatControlReportData(control, participations)
	filler := ex.NewExcelFiller()
	r.f = &filler
	return r
}

func (r *ControlExcelReportFiller) Generate() ex.ExcelReport {
	r.fillControlReportHeader()
	r.fillControlReportEntityHeader(r.c.LegalEntity)
	r.fillControlReportEntitiesLoop()

	return ex.ExcelReport{
		Name: r.c.Num,
		Sheets: []ex.ExcelSheet{
			ex.ExcelSheet{
				Name:       "Controle",
				Values:     r.f.Values,
				Merges:     r.f.Merges,
				Styles:     r.f.Styles,
				RowsHeight: r.f.RowsHeight,
				ColsWidth:  COLS_WIDTH,
				// HideUnusedRows: true,
				// HideUnusedCols: 14,
			},
		},
	}
}

func (r *ControlExcelReportFiller) hasTheEntityBeenUsedAndAppend(p models.Participation) bool {
	if p.AssociatedEntityID != nil {
		for _, id := range r.ueids {
			if id == *p.AssociatedEntityID {
				return true
			}
		}
		r.ueids = append(r.ueids, *p.AssociatedEntityID)
	}
	return false
}

func (r *ControlExcelReportFiller) isParticipationRed(p models.Participation) bool {
	if p.IsTreasury() || !p.IsAssociatedWithAnEntity() || r.hasTheEntityBeenUsedAndAppend(p) || p.AssociatedEntity.LastMentionInLessThenSixMonths() {
		return true
	}
	return false
}

func (r *ControlExcelReportFiller) fillControlReportHeader() {
	// Values
	for cell, value := range BASIC_HEADER_VALUES {
		switch value {
		case NUMBER:
			r.f.SetValueOn(r.c.Num, cell)
		case CUSTO:
			v := ""
			if r.c.Cost != nil {
				v = *r.c.Cost
			}
			r.f.SetValueOn(v, cell)
		case PF:
			r.f.SetValueOn(r.ic, cell)
		case PJ:
			r.f.SetValueOn(r.lc, cell)
		case REQUEST:
			r.f.SetValueOn(r.c.RequestDate.Format("02/01/2006"), cell)
		case DELIVERY:
			r.f.SetValueOn(r.c.DeliveryDate.Format("02/01/2006"), cell)
		default:
			r.f.SetValueOn(value, cell)
		}
	}
	// Styles & Merges
	r.f.SetMerges(BASIC_HEADER_MERGES)
	r.f.SetStyles(BASIC_HEADER_STYLES)
	r.f.SetRowsHeight(BASIC_HEADER_ROWS_HEIGHT)
}

func (r *ControlExcelReportFiller) fillControlReportEntityHeader(e models.LegalEntity) {
	// Values
	for cell, value := range ENTITY_HEADER_VALUES {
		switch value {
		case ENTITY_NAME:
			r.f.SetValueOn(e.Name, cell)
		case ENTITY_CODE:
			r.f.SetValueOn(e.GetFormattedCodeOrEmptyMessage(), cell)
		default:
			r.f.SetValueOn(value, cell)
		}
	}
	// Styles & Merges
	r.f.SetMerges(ENTITY_HEADER_MERGES)
	r.f.SetStyles(ENTITY_HEADER_STYLES)
}

func (r *ControlExcelReportFiller) fillControlReportEntitiesLoop() {
	for i, l := range r.ls {
		starterRow := r.f.LastFilledRow

		// Styles & Merges
		r.f.SetStylesFromStarterRowBasedOnIteration(ENTITIES_ITEM_STYLES, ENTITIES_ITEM_STYLES_EVEN, starterRow, i)

		r.f.SetMergesFromStarterRow(ENTITIES_ITEM_MERGES, starterRow)
		r.f.SetRowsHeightFromStarterRow(ENTITIES_ITEM_ROWS_HEIGHT, starterRow)

		// Values and special styles
		for cell, value := range ENTITIES_ITEM_VALUES {
			switch value {
			case ENTITIES_ITEM_CODE:
				r.f.SetValueOnCellFromStarterRow(l.GetFormattedCodeOrEmptyMessage(), cell, starterRow)
				if l.Code == nil {
					r.f.SetStylesFromStarterRow(ENTITIES_ITEM_STYLES_WITHOUT_CODE, starterRow)
				}
			case ENTITIES_ITEM_NAME:
				r.f.SetValueOnCellFromStarterRow(l.Name, cell, starterRow)
			case ENTITIES_ITEM_OBS:
				if l.CountryID != nil && !l.IsFromBrazil() {
					r.f.SetStylesFromStarterRow(ENTITIES_ITEM_STYLES_WITH_OBS, starterRow)
					if l.IsFromUSA() {
						r.f.SetValueOnCellFromStarterRow("EUA", cell, starterRow)
					} else {
						r.f.SetValueOnCellFromStarterRow(l.Country.NamePT, cell, starterRow)
					}
				}
			default:
				r.f.SetValueOnCellFromStarterRow(value, cell, starterRow)
			}
		}

		// Nested data
		r.fillControlReportEntitiesItemShareholdersHeader(i)

		if len(l.Shareholders) > 0 {
			r.fillControlReportEntitiesItemShareholderLoop(l.Shareholders)
		} else {
			ex.FillNoInfoFullRow(r.f)
		}
		r.fillControlReportEntitiesItemAdministratorsHeader(i)
		if len(l.Administrators) > 0 {
			r.fillControlReportEntitiesItemAdministratorLoop(l.Administrators)
		} else {
			ex.FillNoInfoFullRow(r.f)
		}
	}
}

func (r *ControlExcelReportFiller) fillControlReportEntitiesItemShareholdersHeader(i int) {
	starterRow := r.f.LastFilledRow
	// Values
	r.f.SetValuesOnCellFromStarterRow(ENTITIES_ITEM_SHAREHOLDERS_HEADER_VALUES, starterRow)
	// Styles & Merges
	r.f.SetStylesFromStarterRowBasedOnIteration(ENTITIES_ITEM_SHAREHOLDERS_HEADER_STYLES, ENTITIES_ITEM_SHAREHOLDERS_HEADER_STYLES_EVEN, starterRow, i)
	r.f.SetMergesFromStarterRow(ENTITIES_ITEM_SHAREHOLDERS_HEADER_MERGES, starterRow)
}

func (r *ControlExcelReportFiller) fillControlReportEntitiesItemShareholderLoop(ps []models.Participation) {
	for i, p := range ps {
		starterRow := r.f.LastFilledRow

		// Values
		for cell, value := range ENTITIES_ITEM_SHAREHOLDER_VALUES {
			switch value {
			case SHAREHOLDER_CODE:
				r.f.SetValueOnCellFromStarterRow(p.GetAssociatedEntityCodeOrEmptyMessage(), cell, starterRow)
			case SHAREHOLDER_NAME:
				r.f.SetValueOnCellFromStarterRow(p.GetAssociatedEntityNameOrParticipationDefinition(), cell, starterRow)
			case SHAREHOLDER_PERCENTAGE:
				// value := strconv.FormatFloat(p.CalculatedPercentage, 'f', 2, 64)
				// value = strings.Replace(value, ".", ",", -1)
				r.f.SetValueOnCellFromStarterRow(p.CalculatedPercentage/100, cell, starterRow)
			default:
				r.f.SetValueOnCellFromStarterRow(value, cell, starterRow)
			}
		}

		// Styles & Merges
		itemStyles := ASSOCIATED_ENTITIES_STYLES
		itemEvenStyles := ASSOCIATED_ENTITIES_STYLES_EVEN
		if r.isParticipationRed(p) {
			itemStyles = ASSOCIATED_ENTITIES_STYLES_HIGHLIGHTED
			itemEvenStyles = ASSOCIATED_ENTITIES_STYLES_EVEN_HIGHLIGHTED
		}
		r.f.SetStylesFromStarterRowBasedOnIteration(itemStyles, itemEvenStyles, starterRow, i)
		r.f.SetMergesFromStarterRow(ASSOCIATED_ENTITIES_MERGES, starterRow)
	}
}

func (r *ControlExcelReportFiller) fillControlReportEntitiesItemAdministratorsHeader(i int) {
	starterRow := r.f.LastFilledRow
	// Values
	r.f.SetValuesOnCellFromStarterRow(ENTITIES_ITEM_ADMINISTRATORS_HEADER_VALUES, starterRow)
	// Styles & Merges
	r.f.SetStylesFromStarterRowBasedOnIteration(ENTITIES_ITEM_ADMINISTRATORS_HEADER_STYLES, ENTITIES_ITEM_ADMINISTRATORS_HEADER_STYLES_EVEN, starterRow, i)
	r.f.SetMergesFromStarterRow(ENTITIES_ITEM_ADMINISTRATORS_HEADER_MERGES, starterRow)
}

func (r *ControlExcelReportFiller) fillControlReportEntitiesItemAdministratorLoop(ps []models.Participation) {
	for i, p := range ps {
		starterRow := r.f.LastFilledRow

		// Values
		for cell, value := range ENTITIES_ITEM_ADMINISTRATOR_VALUES {
			switch value {
			case ADMINISTRATOR_CODE:
				r.f.SetValueOnCellFromStarterRow(p.GetAssociatedEntityCodeOrEmptyMessage(), cell, starterRow)
			case ADMINISTRATOR_NAME:
				r.f.SetValueOnCellFromStarterRow(p.GetAssociatedEntityNameOrParticipationDefinition(), cell, starterRow)
			case ADMINISTRATOR_JOB_TITLE:
				if p.JobTitles != nil {
					js := models.ShortenJobTitles(*p.JobTitles)
					r.f.SetValueOnCellFromStarterRow(strings.Join(js, " | "), cell, starterRow)
				}
			default:
				r.f.SetValueOnCellFromStarterRow(value, cell, starterRow)
			}
		}

		// Styles & Merges
		itemStyles := ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES
		itemEvenStyles := ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_EVEN
		if r.isParticipationRed(p) {
			itemStyles = ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_HIGHLIGHTED
			itemEvenStyles = ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_EVEN_HIGHLIGHTED
		}
		r.f.SetStylesFromStarterRowBasedOnIteration(itemStyles, itemEvenStyles, starterRow, i)
		r.f.SetMergesFromStarterRow(ASSOCIATED_ADMINISTRATORS_ENTITIES_MERGES, starterRow)

	}
}
