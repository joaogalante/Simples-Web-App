package excel

import (
	"fmt"
	"strings"
)

var (
	WHITE         = "#FFFFFF"
	BLACK         = "#050505"
	DARK_BLUE     = "#345383"
	LIGHT_BLUE    = "#d7e2f0"
	BLUE          = "#2f70c7"
	BLUE_2        = "#6494d1"
	RED           = "#ea4233"
	GREEN         = "#a2ba66"
	YELLOW        = "#ffc200"
	GLOBAL_STYLES = `"alignment":{"vertical":"center","wrap_text":true}`

	BG_TEXT_COLOR_COMBINATIONS = map[string]string{
		DARK_BLUE:  WHITE,
		LIGHT_BLUE: BLACK,
		WHITE:      BLACK,
		YELLOW:     BLACK,
		BLUE:       WHITE,
		BLUE_2:     WHITE,
		RED:        WHITE,
		GREEN:      WHITE,
	}

	LEFT      = "left"
	RIGHT     = "right"
	BOTTOM    = "bottom"
	TOP       = "top"
	CENTER    = "center"
	ALL_SIDES = []string{LEFT, RIGHT, TOP, BOTTOM}

	PERCENTAGE = 10
)

type Style interface {
	Get() string
}

func FormatStyles(styles ...Style) string {
	stylesStr := []string{}
	for _, s := range styles {
		stylesStr = append(stylesStr, s.Get())
	}
	return fmt.Sprintf("{%s, %s}", GLOBAL_STYLES, strings.Join(stylesStr, ","))
}

func MergeStylesBasedOnIteration(styles map[CellRange]string, evenStyles map[CellRange]string, index int) map[CellRange]string {
	if index%2 == 0 {
		return styles
	}
	return MergeMapOfCellRangeString(styles, evenStyles)
}
