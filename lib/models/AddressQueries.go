package models

import "github.com/cinn-labs/qh"

func GetAddressUpdateParams(a Address, ip []string, ic int, iv []interface{}) qh.ParamsMatching {
	pm := qh.ParamsMatching{ip, ic, iv}

	if a.Name != nil {
		pm.Append("name", *a.Name)
	}

	if a.Num != nil {
		pm.Append("num", *a.Num)
	}

	if a.Complement != nil {
		pm.Append("complement", *a.Complement)
	}

	if a.Postal != nil {
		pm.Append("postal", *a.Postal)
	}

	if a.Region != nil {
		pm.Append("region", *a.Region)
	}

	if a.City != nil {
		pm.Append("city", *a.City)
	}

	if a.State != nil {
		pm.Append("state", *a.State)
	}

	return pm
}
