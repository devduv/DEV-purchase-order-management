package models

// Mensaje : Estructura que representa a un mensaje
type Mensaje struct {
	TipoPeticion 	string			`json:"tipo_peticion"`
	ContenidoCadena	interface{}		`json:"contenido_cadena"`
	ContenidoLista	[]interface{}	`json:"contenido_lista"`
}