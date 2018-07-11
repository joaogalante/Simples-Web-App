package main

import (
	"database/sql"
	"fin/web"
	"fmt"
	"log"

	"os"

	"github.com/cinn-labs/server"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func newDBConnection(connectionString string) *sql.DB {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func main() {
	fmt.Println(`
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼█
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼(▓)
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼█
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼███
┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼███████
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█████████
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█████████
┼┼┼┼┼┼┼┼┼┼┼┼┼███████████
┼┼┼┼┼┼┼┼┼┼┼┼┼▒░░▒▒░░▒░░▒
┼┼┼┼┼┼┼┼┼┼┼┼┼▒░░▒░░▒▒░░▒
┼┼┼┼┼┼┼┼┼┼┼┼┼▒░░▒▒░░▒░░▒
┼┼┼┼┼┼┼┼┼┼┼┼┼███████████
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█▒█████▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█▒█████▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█▒█████▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼┼█▒█████▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼███▒▒▒▒▒███
┼┼┼┼┼┼┼┼┼┼┼┼┼███▒▒▒▒▒███
┼┼┼┼┼┼┼┼┼┼┼┼┼███▒▒▒▒▒███
┼┼┼┼┼┼┼┼┼┼┼┼┼███▒▒▒▒▒███
┼┼┼┼┼┼┼┼┼┼┼┼┼███▒▒▒▒▒███
┼┼┼┼┼┼┼┼┼┼┼┼┼█▒▒█████▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼█▒▒█████▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼█▒▒█████▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼█▒▒█████▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼┼█▒▒█████▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼████▒▒▒▒▒████
┼┼┼┼┼┼┼┼┼┼┼┼████▒▒▒▒▒████
┼┼┼┼┼┼┼┼┼┼┼┼████▒▒▒▒▒████
┼┼┼┼┼┼┼┼┼┼┼┼████▒▒▒▒▒████
┼┼┼┼┼┼┼┼┼┼┼┼████▒▒▒▒▒████
┼┼┼┼┼┼┼┼┼┼┼┼█▒▒▒█████▒▒▒█
┼┼┼┼┼┼┼┼┼┼┼┼█▒▒▒█████▒▒▒█
┼┼┼┼┼┼┼┼┼█┼┼█▒▒▒█████▒▒▒█
┼┼┼██████▒█████████████████
┼┼┼█████▒▒▒████████████████
┼┼┼████▒▒▒▒▒███████████████
┼┼┼███▒▒▒▒▒▒▒██████████████
┼┼┼██▒▒▒▒▒▒▒▒▒█████████████
┼┼┼█▒▒▒▒███▒▒▒▒█▒▒▒▒▒▒▒▒▒▒█
┼┼┼██▒▒█████▒▒██▒▒▒████▒▒██
┼┼┼█▒▒▒█████▒▒▒█▒▒▒█▒▒█▒▒▒█
┼┼┼██▒▒█████▒▒██▒▒▒████▒▒██
┼┼┼█▒▒▒█████▒▒▒█▒▒▒▒▒▒▒▒▒▒█
┼┼┼████████████████████████
	`)

	godotenv.Load()

	dbConnString := os.Getenv("DATABASE_URL")
	jwtSignature := os.Getenv("JWT_SIGNATURE")
	port := os.Getenv("PORT")
	origin := os.Getenv("ORIGIN")
	if origin == "" {
		origin = "*"
	}

	db := newDBConnection(dbConnString)
	server := server.New(db, jwtSignature)
	server.Origin = []string{origin}

	web.InitRoutes(server)

	server.Run(":" + port)
}
