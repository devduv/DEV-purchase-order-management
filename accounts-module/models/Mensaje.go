package models

// Mensaje : estructura que representa una solicitud de cuenta x cobrar
type Mensaje struct {
	TipoPeticion	string			`json:"tipo_peticion"`
	ContenidoCadena	interface{}		`json:"contenido_cadena"`	
	Contenidolista 	[]interface{}	`json:"contenido_lista"`
}