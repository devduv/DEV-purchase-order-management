package models

// Mensaje : Estructura que representa a un mensaje
type MessageOrder struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	OrderX Order  `json:"order"`
}
