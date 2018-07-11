package excel

import "fmt"

type Font struct {
	Color string
	Bold  bool
	Size  string
}

func (s Font) Get() string {
	fs := 11
	switch s.Size {
	case "l":
		fs = 12

	case "s":
		fs = 8
	}

	if s.Color == "" {
		s.Color = BLACK
	}

	return fmt.Sprintf("\"font\":{\"size\":%v, \"color\":\"%s\", \"bold\":%t}", fs, s.Color, s.Bold)
}
