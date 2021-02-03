<?php

class StockRepository
{

    public $dsn = 'mysql:dbname=dbpurchase;host=localhost';
    public $user = 'root';
    public $password = '';
    public $gbd = null;

    function __construct()
    {
        $this->gbd = $this->connect_bd();
    }

    function connect_bd()
    {
        try {
            return new PDO($this->dsn, $this->user, $this->password);
        } catch (PDOException $e) {
            echo 'Falló la conexión: ' . $e->getMessage();
        }
    }

    function getProductStock()
    {
        $gsent = $this->gbd->prepare("SELECT * FROM tmproducto");
        $gsent->execute();
        return $gsent->fetchAll();
    }


    function verify_stock($req)
    {
        $productStock = $this->getProductStock();
        $flag = false;
        for ($i = 0; $i < count($productStock); $i++) {
            $productStockId = $productStock[$i]['CPRODUCT'];
            $productoStockName = $productStock[$i]['PRODUCT_NAME'];
            $stock = $productStock[$i]['STOCK'];
            for ($j = 0; $j < count($req); $j++) {
                $productReqId = $req[$j]->productId;
                $quantity = $req[$j]->quantity;
                if ($productStockId == $productReqId) {
                    echo ("Producto solicitado: " . $productoStockName . " - ");
                    if ($quantity <= $stock) {
                        echo ("Hay productos disponibles para " . $quantity . " productos requeridos\n");
                    } else {
                        echo ("No hay productos disponibles para " . $quantity . " productos requeridos\n");
                        $flag = true;
                        break;
                    }
                }
            }
        }

        if ($flag) {
            echo ("Enviando mensaje de error al módulo de Procesamiento de Ordenes \n");
            return false;
        } else{
            echo("Enviando mensaje al módulo de Reserva \n");
            return true;
        }
    }
}
