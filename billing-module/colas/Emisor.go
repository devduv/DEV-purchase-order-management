package colas

import (
	"github.com/streadway/amqp"
)

// Emisor : Estructura encargada de emitir
type Emisor struct {
	connection *amqp.Connection
}

func (e *Emisor) setup() error {
	ch, err := e.connection.Channel()
	if err != nil {
		panic(err)
	}

	defer ch.Close()
	return err
}

// NewEmisor : Devuelve un nuevo emisor
func NewEmisor(conn *amqp.Connection) (Emisor, error) {
	emisor := Emisor{
		connection: conn,
	}

	err := emisor.setup()
	if err != nil {
		return Emisor{}, err
	}

	return emisor, nil
}

// Push : Publica un mensaje por el la cola especificada
func (e *Emisor) Push(payload []byte, nombreCola string) error {
	ch, err := e.connection.Channel()
	if err !=nil {
		return err
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		nombreCola, // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,	 // arguments
	)
	if err !=nil {
		return err
	}
	
	err = ch.Publish(
		"",	    // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // inmediate
		amqp.Publishing {
			ContentType: "text/plain",
			Body:		  []byte(payload),
		},
	)

	return err
}