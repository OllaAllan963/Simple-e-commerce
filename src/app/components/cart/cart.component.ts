import { Component, inject } from '@angular/core';
import { Product } from '../../models/Product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  //init variables
  cartService = inject(CartService);
  cartProducts: Array<Product> = [];
  TotalAmount: number = 0;
  //end

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
    this.getTotalAmount()
    console.log(this.cartProducts)
  }

  getTotalAmount(): void {
    this.TotalAmount = this.cartProducts.reduce((acc, element) => acc + (element.price * element.quantitiy), 0)
  }

  removeProduct(product: Product): void {
    this.cartService.removeProductFromCart(product);
    this.getTotalAmount();
  }
}
