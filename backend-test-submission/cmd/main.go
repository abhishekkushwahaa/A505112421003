package main

import (
	"log"
	"net/http"

	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/api"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/shorturls", api.LoggingMiddleware(api.CreateShortUrl))
	mux.HandleFunc("/shorturls/", api.LoggingMiddleware(api.GetUrl))
	mux.HandleFunc("/", api.LoggingMiddleware(api.RedirectUrl))

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Server started at http://localhost:8080")
	server.ListenAndServe()
}
