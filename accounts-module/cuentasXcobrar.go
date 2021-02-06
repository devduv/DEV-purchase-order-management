package main

import (
	"./colas"
	"./models"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/streadway/amqp"
)

const (
	user   = "root"
	pass   = ""
	host   = "127.0.0.1"
	port   = 3306
	dbname = "dbpurchase"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	consumidor, err := colas.NewConsumidor(conn)
	failOnError(err, "Fallo al momento de crear un consumidor")

	ch, msgs, err := consumidor.ObtenerMensajes("accounts_queue")
	failOnError(err, "Fallo al momento de obtener los mensajes de la cola")
	defer ch.Close()

	forever := make(chan bool)

	var mensaje models.Mensaje
	go func() {
		for d := range msgs {
			err := json.Unmarshal(d.Body, &mensaje)
			failOnError(err, "Falla al momento de desenpaquetar mensaje")

			fmt.Println("El mensaje recibido es: ", string(d.Body))

			var solicitud models.Solicitud
			err = json.Unmarshal([]byte(mensaje.ContenidoCadena.(string)), &solicitud)

			mysqlInfo := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", user, pass, host, port, dbname)
			db, err := sql.Open("mysql", mysqlInfo)
			failOnError(err, "Falla al momento de abrir conexión a MySQL")
			defer db.Close()

			sqlStatement := `
				INSERT INTO cuenta_x_cobrar (
					CFACTURA,
					FECHA_REGISTRO,
					ID_ABONO,
					ID_CARGO,
					MONTO_TOTAL
				) VALUES (?,?,?,?,?)
			`

			_, err = db.Exec(
				sqlStatement,
				solicitud.NumeroFactura,
				time.Now(),
				1,
				solicitud.IDUsuario,
				solicitud.Monto,
			)
			failOnError(err, "Falla al insertar registro a la base de datos")


			sqlStatement_U := `UPDATE TPORDEN SET ORDER_STATE = 4 WHERE CORDEN = ?`
				resultado_U, err := db.Exec(
					sqlStatement_U,
					solicitud.OrderId,
				)
				fmt.Printf("orden actualizado: %d\n", resultado_U)

			mensaje := &models.Mensaje{
				TipoPeticion:    "FINALIZADO",
				ContenidoCadena: fmt.Sprint(solicitud.IDUsuario),
			}
			body, err := json.Marshal(mensaje)
			failOnError(err, "Fallo al empaquetar el mensaje")

			fmt.Println("Mensaje enviado: ", string(body))

			emisor, err := colas.NewEmisor(conn)
			failOnError(err, "Fallo al momento de crear un emisor")

			err = emisor.Push(body, "end_queue")
			failOnError(err, "Fallo al momento de publicar el mensaje")
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
