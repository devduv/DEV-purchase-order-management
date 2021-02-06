package models

// Solicitud : estructura que representa una solicitud de cuenta x cobrar
type Solicitud struct {
	NumeroFactura	int	
	OrderId			int		
	IDUsuario		int			
	Monto			float64	
}