package reports

import (
	ex "fin/lib/excel"
	"fin/lib/models"
	"fmt"
)

type ControlsEntitiesExcelReportFiller struct {
	ef  *ex.ExcelFiller
	ref *ex.ExcelFiller
	c   models.Control
	es  []models.Entity
	d   ControlsEntitiesReportData
}

func InitControlsEntitiesExcelReportFiller(control models.Control, entities []models.Entity) ControlsEntitiesExcelReportFiller {
	r := ControlsEntitiesExcelReportFiller{}
	r.c = control
	r.es = entities

	// Main sheet
	ef := ex.NewExcelFiller()
	r.ef = &ef

	// Reused entities sheet
	ref := ex.NewExcelFiller()
	r.ref = &ref

	r.d = FormatControlsEntitiesReportData(entities)
	return r
}

func (r *ControlsEntitiesExcelReportFiller) Generate() ex.ExcelReport {
	r.fillControlsEntitiesReport(r.ef, r.d.Entities)
	r.fillControlsReusedEntitiesReport(r.ref, r.d.ReusedEntities)

	return ex.ExcelReport{
		Name: fmt.Sprintf("Pesquisa_%s", r.c.Num),
		Sheets: []ex.ExcelSheet{
			ex.ExcelSheet{
				Name:       r.c.Num,
				Values:     r.ef.Values,
				Merges:     r.ef.Merges,
				Styles:     r.ef.Styles,
				RowsHeight: r.ef.RowsHeight,
				ColsWidth:  CE_COLS_WIDTH,
			},
			ex.ExcelSheet{
				Name:       "Reaproveitados",
				Values:     r.ref.Values,
				Merges:     r.ref.Merges,
				Styles:     r.ref.Styles,
				RowsHeight: r.ref.RowsHeight,
				ColsWidth:  CE_COLS_WIDTH,
			},
		},
	}
}

func (r *ControlsEntitiesExcelReportFiller) fillControlsEntitiesReport(f *ex.ExcelFiller, d EntitiesGroup) {
	for _, e := range d.Legals {
		r.fillEntityRow(f, f.LastFilledRow, e)
	}

	f.SetValueOnCellFromStarterRow("", "A1", f.LastFilledRow)

	for _, e := range d.Individuals {
		r.fillEntityRow(f, f.LastFilledRow, e)
	}

	f.SetValueOnCellFromStarterRow("", "A1", f.LastFilledRow)
}

func (r *ControlsEntitiesExcelReportFiller) fillControlsReusedEntitiesReport(f *ex.ExcelFiller, d map[string]EntitiesGroup) {
	for cn, eg := range d {
		starterRow := f.LastFilledRow
		f.SetValueOnCellFromStarterRow(fmt.Sprintf("Reaproveitadas %s", cn), "B1", starterRow)
		f.SetStylesFromStarterRow(CE_REUSED_ENTITIES_HEADER_STYLE, starterRow)
		r.fillControlsEntitiesReport(f, eg)
	}
}

func (r *ControlsEntitiesExcelReportFiller) fillEntityRow(f *ex.ExcelFiller, starterRow int, e models.Entity) {
	for cell, value := range CE_ENTITIES_VALUES {
		switch value {
		case CE_ENTITY_CODE:
			f.SetValueOnCellFromStarterRow(e.GetFormattedCodeOrPlaceholder(), cell, starterRow)
		case CE_ENTITY_NAME:
			f.SetValueOnCellFromStarterRow(e.Name, cell, starterRow)
		case CE_ENTITY_COUNTRY:
			if e.CountryID != nil {
				f.SetValueOnCellFromStarterRow(e.Country.NamePT, cell, starterRow)
			}
		case CE_ENTITY_STATE:
			if e.Address.State != nil {
				f.SetValueOnCellFromStarterRow(*e.Address.State, cell, starterRow)
			}
		case CE_ENTITY_UNFORMATTED_CODE:
			f.SetValueOnCellFromStarterRow(e.GetCodeOrPlaceholder(), cell, starterRow)
		default:
			f.SetValueOnCellFromStarterRow(value, cell, starterRow)
		}
	}
}
