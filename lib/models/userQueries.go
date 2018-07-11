package models

import (
	"database/sql"
	"errors"

	"github.com/cinn-labs/lg"
	"github.com/cinn-labs/qh"
	"github.com/cinn-labs/validate"
)

func ListUsers(db *sql.DB) ([]User, error) {
	q := "SELECT id, name FROM AppUser"
	rows, err := db.Query(q)

	if err != nil {
		lg.Error(err)
		return nil, err
	}

	defer rows.Close()
	list := []User{}

	for rows.Next() {
		var m User
		err = rows.Scan(&m.ID, &m.Name, &m.Email)
		list = append(list, m)
	}

	return list, nil
}

func ShowUser(db *sql.DB, id int) (m User, err error) {
	m = User{}
	q := "SELECT id, name, email FROM AppUser WHERE id = $1"
	err = db.QueryRow(q, id).Scan(&m.ID, &m.Name, &m.Email)
	if err != nil {
		lg.Error(err)
	}
	return
}

func CreateUser(db *sql.DB, u *User) (validate.Validations, error) {
	q := `INSERT INTO AppUser (name, email, token) VALUES ($1, LOWER($2), $3, $4) RETURNING id`
	u.BeforeCreate()
	if v, err := u.Validate(false); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}
	err := db.QueryRow(q, u.Name, u.Email, u.Token).Scan(&u.ID)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func UpdateUser(db *sql.DB, id int, u *User) (validate.Validations, error) {
	if v, err := u.Validate(true); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	pm := qh.ParamsMatching{[]string{}, 2, []interface{}{id}}

	if u.Name != "" {
		pm.Append("name", u.Name)
	}

	if u.Email != "" {
		pm.AppendWithFunction("email", "LOWER", u.Email)
	}

	q := "UPDATE AppUser SET " + pm.JoinColNames() + " WHERE id = $1"

	_, err := db.Exec(q, pm.ParamsValues...)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func DeleteUser(db *sql.DB, id int) error {
	q := `DELETE FROM AppUser WHERE id = $1`
	_, err := db.Exec(q, id)
	if err != nil {
		lg.Error(err)
	}
	return err
}

func CreateUserPassword(db *sql.DB, token string, u *User) (validate.Validations, error) {
	if token == "" || len(token) == 0 {
		return nil, errors.New("Not a valid token")
	}

	if v, err := u.ValidatePass(); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	pm := qh.ParamsMatching{[]string{}, 2, []interface{}{token}}

	pm.Append("pass", u.Pass)
	pm.Append("token", "")

	q := "UPDATE AppUser SET " + pm.JoinColNames() + " WHERE token = $1"

	_, err := db.Exec(q, pm.ParamsValues...)
	if err != nil {
		lg.Error(err)
	}
	return nil, err
}

func ShowUserByEmailAndPass(db *sql.DB, m *User) (validate.Validations, error) {
	typedPass := m.Pass

	q := "SELECT id, name, pass FROM AppUser WHERE email = $1"
	err := db.QueryRow(q, m.Email).Scan(&m.ID, &m.Name, &m.Pass)
	if err != nil {
		lg.Error(err)
		return nil, err
	}

	if v, err := m.ValidateSignIn(typedPass); err != nil {
		lg.ValidationError(v, err)
		return v, err
	}

	return nil, nil
}
