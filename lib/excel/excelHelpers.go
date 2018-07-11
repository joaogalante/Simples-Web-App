package excel

import "strconv"

func GetColRow(cell string) (string, int) {
	a := []rune(cell)
	row, col := "", ""
	for i, v := range a {
		if i == 0 {
			col += string(v)
		} else {
			row += string(v)
		}
	}
	rowInt, _ := strconv.Atoi(row)
	return col, rowInt
}

func GetCell(col string, row int) string {
	return col + strconv.Itoa(row)
}

func MergeSlicesOfCellRange(slices ...[]CellRange) []CellRange {
	var finalSlice []CellRange

	for _, s := range slices {
		finalSlice = append(finalSlice, s...)
	}

	return finalSlice
}

func MergeMapOfCellRangeString(maps ...map[CellRange]string) map[CellRange]string {
	bigMap := map[CellRange]string{}

	for _, m := range maps {
		for k, v := range m {
			bigMap[k] = v
		}
	}

	return bigMap
}

func FillNoInfoFullRow(f *ExcelFiller) {
	MERGES := []CellRange{CellRange{"B1", "N1"}}
	STYLES := map[CellRange]string{
		CellRange{"B1", "N1"}: FormatStyles(FillAndFont{FillColor: WHITE, FontColor: RED}, Align{H: CENTER}),
	}
	VALUES := map[string]interface{}{
		"B1": "Informação Não Disponível",
	}

	starterRow := f.LastFilledRow
	// Values
	f.SetValuesOnCellFromStarterRow(VALUES, starterRow)
	// Styles & Merges
	f.SetStylesFromStarterRow(STYLES, starterRow)
	f.SetMergesFromStarterRow(MERGES, starterRow)
}

const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

func toCharStrConst(i int) string {
	return abc[i : i+1]
}

func GetExcelColumnName(cNum int) string {
	div := cNum
	cName := ""
	modulo := 0

	for div > 0 {
		modulo = (div - 1) % 26
		cName = toCharStrConst(modulo) + cName
		div = (div - modulo) / 26
	}

	return cName
}
