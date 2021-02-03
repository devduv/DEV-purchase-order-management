import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/Product';
import { QuantityInput } from 'src/app/core/model/QuantityInput';
import { MenuService } from 'src/app/core/services/menu.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public QuantityInput = new QuantityInput();
  public products: Product[];
  constructor(
    private productService: ProductService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private async getProductList() {
    this.products = await this.productService.getProducts();
    console.log(this.products);
  }

  private loadAddCart(product) {
    product.loading = true;
    setTimeout(() => {
      product.loading = false;
      product.message = '¡AGREGADO!';
      setTimeout(() => product.message = 'AGREGAR', 1200);
    }, 1000);
  }

  public addCart(product: any, quantity: number) {
    if (!product.loading && product.message == 'AGREGAR') {
      this.loadAddCart(product);
      const cartItem = { product: product, quantity: quantity };
      let cart = JSON.parse(localStorage.getItem('shopping-cart'));
      if (cart != null) {
        let findItem = this.QuantityInput.findItem(cart, product.id);
        if (findItem == undefined) {
          cart.push(cartItem);
        } else {
          findItem.quantity = (+findItem.quantity) + (+quantity);
        }
      } else {
        cart = [cartItem];
      }
      this.menuService.setCartItems(cart);
    }
  }
}
