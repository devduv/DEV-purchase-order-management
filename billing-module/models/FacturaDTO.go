package models

import (
// "time"
)

// Factura : estructura que representa una factura
type FacturaDTO struct {
	OrderId      int `json:"orderId"`
	CustomerId   string `json:"customerId"`
	CustomerName string `json:"customerName"`
	Ruc          string `json:"ruc"`
	IGV          float64 `json:"IGV"`
	State        string `json:"state"`
	Date         string `json:"date"`
	TotalAmount  float64 `json:"totalAmount"`
}
