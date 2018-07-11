package excel

import "fin/lib/helpers"

type ExcelFiller struct {
	Col           string
	Row           int
	LastFilledRow int // Used for starter points on loops
	Values        map[string]interface{}
	Styles        map[CellRange]string
	Merges        []CellRange
	RowsHeight    map[int]float64
}

func NewExcelFiller() ExcelFiller {
	return ExcelFiller{"A", 1, 1, map[string]interface{}{}, map[CellRange]string{}, []CellRange{}, map[int]float64{}}
}

func (f *ExcelFiller) SetCell(cell string) {
	f.Col, f.Row = GetColRow(cell)
}

func (f *ExcelFiller) SetValue(value interface{}) {
	if f.Row > f.LastFilledRow {
		f.LastFilledRow = f.Row
	}
	f.Values[GetCell(f.Col, f.Row)] = value
}

func (f *ExcelFiller) SetValueOn(value interface{}, cell string) {
	f.SetCell(cell)
	f.SetValue(value)
}

func (f *ExcelFiller) SetValueOnCellFromStarterRow(value interface{}, cell string, starterRow int) {
	col, row := GetColRow(cell)
	f.Row = starterRow + row
	f.Col = col
	f.SetValue(value)
}

func (f *ExcelFiller) SetValuesOnCellFromStarterRow(values map[string]interface{}, starterRow int) {
	for cell, value := range values {
		f.SetValueOnCellFromStarterRow(value, cell, starterRow)
	}
}

func (f *ExcelFiller) SetStyles(styles map[CellRange]string) {
	f.Styles = MergeMapOfCellRangeString(f.Styles, styles)
}

func (f *ExcelFiller) SetStylesBasedOnIteration(styles map[CellRange]string, evenStyles map[CellRange]string, index int) {
	fs := MergeStylesBasedOnIteration(styles, evenStyles, index)
	f.SetStyles(fs)
}

func (f *ExcelFiller) SetStylesFromStarterRow(styles map[CellRange]string, starterRow int) {
	for crange, style := range styles {
		crange.IncrementRows(starterRow)
		f.Styles[crange] = style
	}
}

func (f *ExcelFiller) SetStylesFromStarterRowBasedOnIteration(styles map[CellRange]string, evenStyles map[CellRange]string, starterRow int, index int) {
	fs := MergeStylesBasedOnIteration(styles, evenStyles, index)
	for crange, style := range fs {
		crange.IncrementRows(starterRow)
		f.Styles[crange] = style
	}
}

func (f *ExcelFiller) SetRowsHeight(rows map[int]float64) {
	f.RowsHeight = helpers.MergeMapOfIntFloat64(f.RowsHeight, rows)
}

func (f *ExcelFiller) SetRowsHeightFromStarterRow(rows map[int]float64, starterRow int) {
	for row, height := range rows {
		f.RowsHeight[starterRow+row] = height
	}
}

func (f *ExcelFiller) SetMerges(merges []CellRange) {
	f.Merges = MergeSlicesOfCellRange(f.Merges, merges)
}

func (f *ExcelFiller) SetMergesFromStarterRow(merges []CellRange, starterRow int) {
	for _, crange := range merges {
		crange.IncrementRows(starterRow)
		f.Merges = append(f.Merges, crange)
	}
}
