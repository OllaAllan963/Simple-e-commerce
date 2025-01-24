import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  //init variables
  @Input({ required: true }) product: Product = {} as Product;
  cartService = inject(CartService);
  //end

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}
