package models

import (
	"time"
)

type Mention struct {
	ID          int        `json:"id"`
	EntityID    int        `json:"entityID"`
	ControlID   int        `json:"controlID"`
	MentionedAt *time.Time `json:"mentionedAt"`
}
