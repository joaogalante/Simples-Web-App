package models

import (
	"fin/lib/folders"
)

func GenerateEntitiesFolderStructure(es []Entity) folders.FolderStructureNode {
	fs := folders.FolderStructureNode{}
	fs.Name = "Ordem de Serviço"

	for _, e := range es {
		fs.ChildNodes = append(fs.ChildNodes, folders.FolderStructureNode{e.Name, []folders.FolderStructureNode{}, false})
	}

	return fs
}
