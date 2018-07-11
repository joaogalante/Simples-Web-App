package helpers

import (
	"regexp"
	"strings"

	"github.com/Nhanderu/brdoc"
)

var (
	CNPJ_MAP_POINTS = map[int]string{
		2:  ".",
		5:  ".",
		8:  "/",
		12: "-",
	}
	CPF_MAP_POINTS = map[int]string{
		3: ".",
		6: ".",
		9: "-",
	}
)

func GetOnlyNumbersFrom(s string) string {
	re := regexp.MustCompile("[0-9]+")
	return strings.Join(re.FindAllString(s, -1), "")
}

func formatWithMap(s string, m map[int]string) (fs string) {
	for i, c := range s {
		fs = fs + m[i] + string(c)
	}
	return
}

func FormatCNPJ(s string) string {
	return formatWithMap(GetOnlyNumbersFrom(s), CNPJ_MAP_POINTS)
}

func FormatCPF(s string) string {
	return formatWithMap(GetOnlyNumbersFrom(s), CPF_MAP_POINTS)
}

func FormatEntityCode(s string) (fs string) {
	if brdoc.IsCNPJ(s) {
		fs = FormatCNPJ(s)
	} else {
		fs = FormatCPF(s)
	}

	return
}
