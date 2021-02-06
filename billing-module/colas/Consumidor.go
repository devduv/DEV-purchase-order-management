package colas

import (
	"github.com/streadway/amqp"
)

// Consumidor : Estructura encargada de consumir
type Consumidor struct {
	connection      *amqp.Connection
}

func (consumidor *Consumidor) setup() error{
	ch, err := consumidor.connection.Channel()
	if err != nil {
		return err
	}

	defer ch.Close()
	return err
}

// NewConsumidor : Devuelve un nuevo Consumidor
func NewConsumidor(conn *amqp.Connection) (Consumidor, error) {
	consumidor := Consumidor{
		connection: conn,
	}
	err := consumidor.setup()
	if err != nil {
		return Consumidor{}, err
	}

	return consumidor, nil
}

// ObtenerMensajes : Devuleve los mensajes obtenidos de la cola
func (consumidor *Consumidor) ObtenerMensajes(nombreCola string) (*amqp.Channel, <-chan amqp.Delivery, error) {
	ch, err := consumidor.connection.Channel()
	if err != nil {
		return nil, nil, err
	}

	q, err := ch.QueueDeclare(
		nombreCola, // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	if err != nil {
		return nil, nil, err
	}

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)

	return ch, msgs, err
}

