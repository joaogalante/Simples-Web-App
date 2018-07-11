package excel

import (
	"fin/lib/folders"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/cinn-labs/lg"
)

const (
	MAX_ROW            = 1048575
	MAX_COL            = 16384
	DEFAULT_SHEET_NAME = "Sheet1"
)

type CellRange struct {
	Start string
	End   string
}

func (cr *CellRange) IncrementRows(amount int) {
	scol, srow := GetColRow(cr.Start)
	ecol, erow := GetColRow(cr.End)
	newSrow := amount + srow
	newErow := amount + erow
	cr.Start = GetCell(scol, newSrow)
	cr.End = GetCell(ecol, newErow)
}

type ExcelReport struct {
	Name   string
	Sheets []ExcelSheet
}

type ExcelSheet struct {
	Name           string
	Values         map[string]interface{}
	Styles         map[CellRange]string
	Merges         []CellRange
	ColsWidth      map[CellRange]float64
	RowsHeight     map[int]float64
	HideUnusedRows bool
	HideUnusedCols int
}

func (r *ExcelReport) GenerateExcel() (string, error) {
	file := excelize.NewFile()

	for i, sheet := range r.Sheets {
		var sheetIndex int
		if i == 0 {
			// First sheet use the default sheet that excelize creates
			file.SetSheetName(DEFAULT_SHEET_NAME, sheet.Name)
			sheetIndex = file.GetSheetIndex(sheet.Name)
		} else {
			// Second sheet and beyond needs to be created
			sheetIndex = file.NewSheet(sheet.Name)
		}
		file.SetActiveSheet(sheetIndex)

		sheet.setMerges(file)
		sheet.setValues(file)
		err := sheet.setStyles(file)
		sheet.setColsWidth(file)
		sheet.setRowsHeight(file)
		sheet.limitRowsAndCols(file)

		if err != nil {
			lg.Error(err)
			return "", err
		}
	}

	filePath, err := folders.GenerateDownloadFolder(r.Name, "xlsx")
	if err != nil {
		lg.Error(err)
		return "", err
	}

	if err := file.SaveAs(filePath); err != nil {
		lg.Error(err)
		return "", err
	}

	return filePath, nil
}

func (s *ExcelSheet) setMerges(file *excelize.File) {
	for _, crange := range s.Merges {
		file.MergeCell(s.Name, crange.Start, crange.End)
	}
}

func (s *ExcelSheet) setValues(file *excelize.File) {
	for cell, value := range s.Values {
		file.SetCellValue(s.Name, cell, value)
	}
}

func (s *ExcelSheet) setStyles(file *excelize.File) error {
	// TODO: Group styles and generate only once per group
	for crange, styleStr := range s.Styles {
		style, err := file.NewStyle(styleStr)

		if err != nil {
			lg.Error(err, styleStr)
			return err
		}

		file.SetCellStyle(s.Name, crange.Start, crange.End, style)
	}
	return nil
}

func (s *ExcelSheet) setColsWidth(file *excelize.File) error {
	for crange, width := range s.ColsWidth {
		file.SetColWidth(s.Name, crange.Start, crange.End, width)
	}
	return nil
}

func (s *ExcelSheet) setRowsHeight(file *excelize.File) error {
	for row, height := range s.RowsHeight {
		file.SetRowHeight(s.Name, row-1, height)
	}
	return nil
}

func (s *ExcelSheet) limitRowsAndCols(file *excelize.File) {
	if s.HideUnusedRows {
		r := len(file.GetRows(s.Name))
		for r < MAX_ROW {
			file.SetRowVisible(s.Name, r, false)
			r += 1
		}
	}

	if s.HideUnusedCols != 0 {
		c := s.HideUnusedCols
		for c < MAX_COL {
			file.SetColVisible(s.Name, GetExcelColumnName(c), false)
			c += 1
		}
	}
}
