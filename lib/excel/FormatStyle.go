package excel

type Format struct {
	Type int
}

func (s Format) Get() string {
	switch s.Type {
	case PERCENTAGE:
		return `"number_format":10`
	}
	return ""
}
