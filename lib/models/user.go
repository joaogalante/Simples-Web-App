package models

import (
	"github.com/cinn-labs/pwd"
	"github.com/cinn-labs/validate"
	uuid "github.com/satori/go.uuid"
)

type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Pass      string `json:"pass"`
	Token     string `json:"token"`
	AuthToken string `json:"authToken"`
}

func (u *User) Validate(update bool) (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	if u.Name == "" && !update {
		err = v.Add("name", "Required")
	}

	return v, err
}

func (u *User) ValidatePass() (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	if u.Pass == "" {
		err = v.Add("pass", "Required")
	}

	if len(u.Pass) < 4 {
		err = v.Add("pass", "Small")
	}

	return v, err
}

func (u *User) ValidateSignIn(typedPass string) (validate.Validations, error) {
	v := validate.Validations{}
	var err error = nil

	if u.Email == "" {
		err = v.Add("email", "Required")
	}

	if len(u.Email) < 4 {
		err = v.Add("email", "Small")
	}

	if u.Pass == "" {
		err = v.Add("pass", "Required")
	}

	if len(u.Pass) < 4 {
		err = v.Add("pass", "Small")
	}

	if pwd.ComparePwd(u.Pass, []byte(typedPass)) != true {
		err = v.Add("pass", "Doesn't match")
	}

	return v, err
}

func (u *User) BeforeCreate() {
	u.Token = uuid.NewV4().String()
}
