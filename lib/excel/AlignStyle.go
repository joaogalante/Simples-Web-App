package excel

import "fmt"

type Align struct {
	H      string
	NoWrap bool
}

func (s Align) Get() string {
	return fmt.Sprintf("\"alignment\":{\"horizontal\":\"%s\", \"wrap_text\":%t}", s.H, !s.NoWrap)
}
