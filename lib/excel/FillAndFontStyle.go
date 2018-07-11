package excel

import "fmt"

type FillAndFont struct {
	FillColor string
	FontColor string
	Bold      bool
	Size      string
}

func (s FillAndFont) Get() string {
	fi := Fill{s.FillColor}
	if s.FontColor == "" {
		s.FontColor = fi.GetFontColor()
	}
	fo := Font{s.FontColor, s.Bold, s.Size}
	return fmt.Sprintf("%s, %s", fi.Get(), fo.Get())
}
