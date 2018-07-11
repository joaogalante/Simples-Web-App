package reports

import (
	ex "fin/lib/excel"
	"fin/lib/models"
)

var (
	CE_COLS_WIDTH = map[ex.CellRange]float64{
		ex.CellRange{"A", "A"}: 20,
		ex.CellRange{"B", "B"}: 51,
		ex.CellRange{"C", "C"}: 4,
		ex.CellRange{"D", "D"}: 22,
		ex.CellRange{"E", "E"}: 17,
	}

	CE_ENTITY_CODE             = "$ENTITY_CODE"
	CE_ENTITY_NAME             = "$ENTITY_NAME"
	CE_ENTITY_STATE            = "$ENTITY_STATE"
	CE_ENTITY_COUNTRY          = "$ENTITY_COUNTRY"
	CE_ENTITY_UNFORMATTED_CODE = "$ENTITY_UNFORMATTED_CODE"

	CE_ENTITIES_VALUES = map[string]interface{}{
		"A1": CE_ENTITY_CODE,
		"B1": CE_ENTITY_NAME,
		"C1": CE_ENTITY_STATE,
		"D1": CE_ENTITY_COUNTRY,
		"E1": CE_ENTITY_UNFORMATTED_CODE,
	}

	CE_REUSED_ENTITIES_HEADER_STYLE = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(ex.FillAndFont{FillColor: ex.YELLOW}),
	}
)

func GenerateControlsEntitiesReport(control models.Control, entities []models.Entity) ex.ExcelReport {
	r := InitControlsEntitiesExcelReportFiller(control, entities)
	return r.Generate()
}
