package excel

import "fmt"

type Fill struct {
	Color string
}

func (s Fill) Get() string {
	return fmt.Sprintf("\"fill\":{\"type\":\"pattern\",\"color\":[\"%s\"],\"pattern\":1}", s.Color)
}

func (s Fill) GetFontColor() string {
	return BG_TEXT_COLOR_COMBINATIONS[s.Color]
}
