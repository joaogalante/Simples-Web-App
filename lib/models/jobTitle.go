package models

import (
	"strings"
)

type JobTitle struct {
	Name string `json:"name"`
}

const NORMAL_INTENSITY = 1
const MEDIUM_INTENSITY = 2

func shortenArrayWithIntensity(js []string, i int) []string {
	njs := []string{}
	for _, j := range js {
		njs = append(njs, ShortenJobTitle(j, i))
	}
	if i == NORMAL_INTENSITY && len(strings.Join(js, " | ")) == len(strings.Join(njs, " | ")) {
		return shortenArrayWithIntensity(js, MEDIUM_INTENSITY)
	}
	return njs
}

func ShortenJobTitles(js []string) []string {
	size := len(js)
	fSize := len(strings.Join(js, " | "))

	if size == 0 || fSize <= 28 {
		return js
	}

	i := NORMAL_INTENSITY

	if size >= 3 || fSize >= 35 {
		i = MEDIUM_INTENSITY
	}

	return shortenArrayWithIntensity(js, i)
}

func ShortenJobTitle(j string, i int) string {
	if i > NORMAL_INTENSITY {
		j = strings.Replace(j, "Diretor", "Dir.", -1)
		j = strings.Replace(j, "Director", "Dir.", -1)
		j = strings.Replace(j, "Administrador", "Admin.", -1)
		j = strings.Replace(j, "Administrator", "Admin.", -1)
		j = strings.Replace(j, "Chief Financial Officer", "CFO", -1)
		j = strings.Replace(j, "Chief Technology Officer", "CTO", -1)
		j = strings.Replace(j, "Chief Executive Officer", "CEO", -1)
		j = strings.Replace(j, "Executive", "Exec.", -1)
		j = strings.Replace(j, "Executivo", "Exec.", -1)
	}

	j = strings.Replace(j, "Vice Presidente", "VP", -1)
	j = strings.Replace(j, "Vice-Presidente", "VP", -1)
	j = strings.Replace(j, "Vice President", "VP", -1)
	j = strings.Replace(j, "Vice-President", "VP", -1)
	j = strings.Replace(j, "Presidente", "Pres.", -1)
	j = strings.Replace(j, "President", "Pres.", -1)
	j = strings.Replace(j, "Administrador", "Admin.", -1)
	j = strings.Replace(j, "Administrator", "Admin.", -1)
	j = strings.Replace(j, "Supervisor", "Superv..", -1)

	return j
}
