package folders

import (
	"fmt"
	"os"

	uuid "github.com/satori/go.uuid"
)

func GenerateDownloadFolder(fn string, fe string) (string, error) {
	rf := os.Getenv("DOWNLOAD_PATH")
	if rf == "" {
		rf = "tmp/"
	}
	if _, err := os.Stat(rf); os.IsNotExist(err) {
		os.Mkdir(rf, 0700)
	}
	folderPath := fmt.Sprintf("tmp/%s", uuid.NewV4().String())
	err := os.Mkdir(folderPath, 0700)
	filePath := fmt.Sprintf("%s/%s.%s", folderPath, fn, fe)
	return filePath, err
}
