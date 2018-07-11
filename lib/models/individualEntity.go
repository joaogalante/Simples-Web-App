package models

type IndividualEntity struct {
	Entity
}

func (i *IndividualEntity) AfterInit() {
	i.EntityType = ENTITY_TYPES["individual"]
}

func (i *IndividualEntity) BeforeSave() {
	i.Entity.BeforeSave()
}
