package helpers

func MergeMapOfInterfaces(maps ...map[string]interface{}) map[string]interface{} {
	bigMap := map[string]interface{}{}

	for _, m := range maps {
		for k, v := range m {
			bigMap[k] = v
		}
	}

	return bigMap
}

func MergeMapOfStrings(maps ...map[string]string) map[string]string {
	bigMap := map[string]string{}

	for _, m := range maps {
		for k, v := range m {
			bigMap[k] = v
		}
	}

	return bigMap
}

func MergeMapOfIntFloat64(maps ...map[int]float64) map[int]float64 {
	bigMap := map[int]float64{}

	for _, m := range maps {
		for k, v := range m {
			bigMap[k] = v
		}
	}

	return bigMap
}
