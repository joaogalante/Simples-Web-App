package helpers

func NilOrEmptyString(a *string) bool {
	return a == nil || *a == ""
}

func NilOrEmptyInt(a *int) bool {
	return a == nil || *a == 0
}
