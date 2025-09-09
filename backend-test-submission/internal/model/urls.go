package model

import "time"

type URL struct {
	RealURL    string    `json:"realUrl"`
	ShortURL   string    `json:"shortURL"`
	CreatedAt  time.Time `json:"createdAt"`
	Expiry     time.Time `json:"expiry"`
	ShortCount int       `json:"shortCount"`
}
