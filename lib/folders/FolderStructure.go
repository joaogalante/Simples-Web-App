package folders

import (
	"archive/zip"
	"os"

	"github.com/cinn-labs/lg"
)

var EMPTY_FILE = FolderStructureNode{".EMPTY", []FolderStructureNode{}, true}

type FolderStructureNode struct {
	Name       string                `json:"name"`
	ChildNodes []FolderStructureNode `json:"childNodes"`
	IsFile     bool                  `json:"isFile"`
}

func (s *FolderStructureNode) Compress() (string, error) {
	filePath, err := GenerateDownloadFolder(s.Name, "zip")
	if err != nil {
		lg.Error(err)
		return "", err
	}

	outFile, err := os.Create(filePath)
	if err != nil {
		lg.Error(err)
		return "", err
	}

	defer outFile.Close()

	zipWriter := zip.NewWriter(outFile)

	s.LoopTroughEndings("", func(n FolderStructureNode, p string) {
		fileWriter, lerr := zipWriter.Create(p + n.Name)
		if lerr != nil {
			lg.Error(err)
			err = lerr
		}
		_, lerr = fileWriter.Write([]byte("Temporary empty file"))
		if lerr != nil {
			lg.Error(lerr)
			err = lerr
		}
	})

	if err != nil {
		lg.Error(err)
	}

	err = zipWriter.Close()
	if err != nil {
		lg.Error(err)
	}
	return filePath, err
}

func recursiveNodeLoop(path string, action func(FolderStructureNode, string), node FolderStructureNode) {
	for _, n := range node.ChildNodes {
		if n.IsFile {
			action(n, path)
		}

		newPath := path + n.Name + "/"

		if len(n.ChildNodes) == 0 {
			bn := EMPTY_FILE
			action(bn, newPath)
		}

		recursiveNodeLoop(newPath, action, n)
	}
}

func (s *FolderStructureNode) LoopTroughEndings(path string, action func(FolderStructureNode, string)) {
	recursiveNodeLoop(s.Name+"/", action, *s)
}
