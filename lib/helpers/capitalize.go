package helpers

import (
	"regexp"
	"strings"
)

var r = regexp.MustCompile(`\w+`)

func replace(word string) string {
	switch word {
	case "do", "da", "em", "na", "no", "um", "uma":
		return word
	}
	return strings.Title(word)
}

func CapitalizeString(str string) string {
	return r.ReplaceAllStringFunc(strings.ToLower(str), replace)
}

func CapitalizeOptionalString(str *string) *string {
	if str != nil {
		r := CapitalizeString(*str)
		return &r
	}
	return nil
}
