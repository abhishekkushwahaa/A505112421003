package api

import "net/http"

// EnableCORS is a middleware that adds the necessary headers for CORS.
func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set the origin that is allowed to make requests.
		// We're setting it to your client's address.
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")

		// Set the allowed HTTP methods.
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		// Set the allowed headers for the request.
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle the preflight request for CORS.
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Call the next handler in the chain.
		next.ServeHTTP(w, r)
	})
}
