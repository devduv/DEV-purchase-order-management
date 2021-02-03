export class QuantityInput {

    public actionQuantity($event, flag, product) {
        if ($event.value < 0) {
            $event.value = 1;
        } else {
            if (flag === 1) {
                $event.value++;
            } else {
                if ($event.value != 1) {
                    $event.value--;
                }
            }
        }
        this.calculateTotal(product, $event.value);
    }

    public keyPress($event, quantity, product) {
        const key = $event.data;
        if (key == '-' || key == 'e' || key == '+' || key == '.') {
            quantity.value = null;
            quantity.value = 1;
        }
        if (quantity.value == 0) {
            quantity.value = 1;
        }

        quantity.value = +quantity.value;
        this.calculateTotal(product, quantity.value);
    }

    public findItem(cart: any, productId: string) {
        const item = cart.find(item => item.product.id == productId);
        return item;
    }

    private calculateTotal(product: any, quantity) {
        if (product != null) {
            product.quantity = quantity;
            let cart = JSON.parse(localStorage.getItem('shopping-cart'));
            if (cart != null) {
                let findItem = this.findItem(cart, product.product.id);
                findItem.quantity = (+quantity);
                localStorage.setItem('shopping-cart', JSON.stringify(cart));
            }
        }
    }
}