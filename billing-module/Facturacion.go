package main

import (
	"./colas"
	"./models"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"log"
	_ "github.com/go-sql-driver/mysql"
)

const (
	user   = "root"
	pass   = ""
	host   = "localhost"
	port   = 3306
	dbname = "dbpurchase"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func procesarFactura(factura models.FacturaDTO, contenidoLista []models.FacturaDetalle) {

	mysqlInfo := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", user, pass, host, port, dbname)
	db, err := sql.Open("mysql", mysqlInfo)
	failOnError(err, "Falla al momento de abrir conexión a MySQL")
	defer db.Close()

	sqlStatement := `
		INSERT INTO tpfactura (
			CORDEN,
			DOCUMENTO_CLIENTE,
			NOMBRE_CLIENTE,
			RUC,
			IGV,
			FECHA_FACTURACION,
			ESTADO,
			MONTO_TOTAL
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
	resultado, err := db.Exec(
		sqlStatement,
		factura.OrderId,
		factura.CustomerId,
		factura.CustomerName,
		factura.Ruc,
		factura.IGV,
		factura.Date,
		factura.State,
		factura.TotalAmount,
	)
	failOnError(err, "Falla al insertar registro a la base de datos")

	// fmt.Printf("El id DE LA ORDEN: %d\n", factura.OrderId)
	sqlStatement_U := `UPDATE TPORDEN SET ORDER_STATE = 3 WHERE CORDEN = ?`
	resultado_U, err := db.Exec(
		sqlStatement_U,
		factura.OrderId,
	)
	fmt.Printf("orden actualizado: %d\n", resultado_U)
	failOnError(err, "Falla al insertar registro a la base de datos")
	idFactura, err := resultado.LastInsertId()
	fmt.Printf("El id del ultimo registro es: %d\n", idFactura)
	var facturaDetalle models.FacturaDetalle
	for _, facDet := range contenidoLista {
		fmt.Printf("facturaDetalle.IDProducto %d", facturaDetalle.IDProducto)
		sqlStatement := `
			INSERT INTO tpdetallefactura (
				CFACTURA,
				CPRODUCTO,
				NOMBRE_PRODUCTO,
				CANTIDAD,
				COSTO_UNITARIO
			) VALUES (?, ?, ?, ?, ?)
		`
		_, err := db.Exec(
			sqlStatement,
			idFactura,
			facDet.IDProducto,
			facDet.Nombre,
			facDet.Cantidad,
			facDet.CostoUnitario,
		)
		failOnError(err, "Falla al insertar registro a la base de datos")
	}

	solicitud := &models.Solicitud{
		NumeroFactura: int(idFactura),
		OrderId: factura.OrderId,
		IDUsuario:     factura.CustomerId,
		Monto: factura.TotalAmount,
	}

	contCadena, err := json.Marshal(solicitud)

	mensajeX := &models.Mensaje{
		TipoPeticion:    "insertarCuentaXCobrar",
		ContenidoCadena: string(contCadena),
	}

	body, err := json.Marshal(mensajeX)
	failOnError(err, "Fallo al empaquetar el mensaje")

	fmt.Println("Mensaje enviado: ", string(body))

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	emisor, err := colas.NewEmisor(conn)
	failOnError(err, "Fallo al momento de crear un emisor")

	err = emisor.Push(body, "accounts_queue")
	failOnError(err, "Fallo al momento de publicar el mensaje")
}

func main() {

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	consumidor, err := colas.NewConsumidor(conn)
	failOnError(err, "Fallo al momento de crear un consumidor")

	ch, msgs, err := consumidor.ObtenerMensajes("reserve_queue")
	failOnError(err, "Fallo al momento de obtener los mensajes de la cola")
	defer ch.Close()

	forever := make(chan bool)

	var mensaje models.MessageOrder

	go func() {
		for d := range msgs {
			err := json.Unmarshal(d.Body, &mensaje)
			failOnError(err, "Falla al momento de desenpaquetar mensaje")

			fmt.Println("El mensaje recibido es: ", string(d.Body))
			fmt.Println("Este es el tipo de peticion del mensaje: ", mensaje.Message)
			procesarFactura(mensaje.OrderX.Factura, mensaje.OrderX.OrderDetails)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
