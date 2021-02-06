package models

// FacturaDetalle : estructura que representa el detalle de una factura
type FacturaDetalle struct {
	IDProducto 			int		`json:"productId"`
	Nombre				string	`json:"productName"`
	Cantidad			int		`json:"quantity"`
	CostoUnitario		float64	`json:"productPrice"`
}	