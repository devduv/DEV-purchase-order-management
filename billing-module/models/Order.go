package models

// Mensaje : Estructura que representa a un mensaje
type Order struct {
	Id           int        `json:"id"`
	Factura      FacturaDTO    `json:"factura"`
	User         interface{}   `json:"user"`
	OrderDetails []FacturaDetalle `json:"order_details"`
}
