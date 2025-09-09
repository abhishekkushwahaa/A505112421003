package store

import (
	"sync"

	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/model"
)

var store = make(map[string]*model.URL)
var mu sync.RWMutex

func StoreURL(shortCode string, url *model.URL) {
	mu.Lock()
	defer mu.Unlock()
	store[shortCode] = url
}

func FetchURL(shortCode string) (*model.URL, bool) {
	mu.RLock()
	defer mu.RUnlock()
	url, found := store[shortCode]
	return url, found
}
