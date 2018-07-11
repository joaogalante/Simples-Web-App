package excel

import (
	"fmt"
	"strings"
)

type Border struct {
	Color string
	Style int
	Sides []string
}

func (s Border) Get() string {
	if s.Color == "" {
		s.Color = BLACK
	}

	if s.Style == 0 {
		s.Style = 1
	}

	l := []string{}
	for _, side := range s.Sides {
		fs := fmt.Sprintf("{\"type\":\"%s\",\"color\":\"%s\",\"style\":%d}", side, s.Color, s.Style)
		l = append(l, fs)
	}

	return fmt.Sprintf("\"border\":[%s]", strings.Join(l, ","))
}
