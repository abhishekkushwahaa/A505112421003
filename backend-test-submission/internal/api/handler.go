package api

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/model"
	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/service"
	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/store"
)

type ShortRequest struct {
	URL       string `json:"url"`
	Validity  int    `json:"validity"`
	Shortcode string `json:"shortcode"`
}

func CreateShortUrl(w http.ResponseWriter, r *http.Request) {
	var req ShortRequest
	json.NewDecoder(r.Body).Decode(&req)

	shortCode := req.Shortcode
	if shortCode == "" {
		shortCode = service.DoShortUrl()
	}

	expiry := time.Now().Add(30 * time.Minute)
	if req.Validity > 0 {
		expiry = time.Now().Add(time.Duration(req.Validity) * time.Minute)
	}

	urlData := &model.URL{
		RealURL:    req.URL,
		ShortURL:   "http://localhost:8080/" + shortCode,
		CreatedAt:  time.Now(),
		Expiry:     expiry,
		ShortCount: 0,
	}

	store.StoreURL(shortCode, urlData)

	resp := map[string]string{
		"shortLink": urlData.ShortURL,
		"expiry":    expiry.Format(time.RFC3339),
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resp)
}

func GetUrl(w http.ResponseWriter, r *http.Request) {
	shortCode := strings.TrimPrefix(r.URL.Path, "/shorturls/")
	urlData, found := store.FetchURL(shortCode)
	if !found {
		http.Error(w, "Shortcode not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(urlData)
}

func RedirectUrl(w http.ResponseWriter, r *http.Request) {
	shortCode := strings.TrimPrefix(r.URL.Path, "/")
	urlData, found := store.FetchURL(shortCode)
	if !found {
		http.Error(w, "Shortcode not found", http.StatusNotFound)
		return
	}

	if time.Now().After(urlData.Expiry) {
		http.Error(w, "Shortcode expired", http.StatusGone)
		return
	}

	urlData.ShortCount++
	store.StoreURL(shortCode, urlData)

	http.Redirect(w, r, urlData.RealURL, http.StatusFound)
}
