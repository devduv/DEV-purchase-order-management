import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
