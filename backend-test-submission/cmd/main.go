package main

import (
	"log"
	"net/http"

	"github.com/abhishekkushwahaa/A505112421003/backend-question-1/internal/api"
)

func main() {
	mux := http.NewServeMux()

	// Register all your API handlers with the mux router
	mux.HandleFunc("/shorturls", api.LoggingMiddleware(api.CreateShortUrl))
	mux.HandleFunc("/shorturls/", api.LoggingMiddleware(api.GetUrl))
	mux.HandleFunc("/", api.LoggingMiddleware(api.RedirectUrl))

	// Chain the CORS middleware on top of the entire router.
	// The Handler field expects a http.Handler, which the mux is.
	corsHandler := api.EnableCORS(mux)

	server := &http.Server{
		Addr:    ":8080",
		Handler: corsHandler, // Use the wrapped handler
	}

	log.Println("Server started at http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}
