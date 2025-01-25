import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Product } from '../../models/Product';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //init variables
  cartProducts: Array<Product> = [];
  notificationService = inject(NotificationService)
  translateService = inject(TranslateService)
  private storageKey = 'cartProducts';
  //end
  constructor() {
    const storedProducts = localStorage.getItem(this.storageKey);
    if (storedProducts) {
      this.cartProducts = JSON.parse(storedProducts)
    }
  }

  addToCart(product: Product) {
    const existingProduct = this.cartProducts.find(prod => prod.id === product.id);

    if (existingProduct) {
      existingProduct.quantitiy += 1;
      this.notificationService.showSuccess(`${product.title} ${this.translateService.instant('validation.AlreadyInTheCart')}: ${existingProduct.quantitiy}`)
    } else {
      product.quantitiy = 1;
      this.cartProducts.push(product)
      this.notificationService.showSuccess(`${product.title} ${this.translateService.instant('validation.AddedInTheCart')}`)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.cartProducts))
  }

  getCartProductCount(): number {
    return this.cartProducts.length
  }

  getCartProducts(): Array<Product> {
    return this.cartProducts;
  }

  removeProductFromCart(product: Product): void {
    const index = this.cartProducts.findIndex(prod => prod.id === product.id);

    if (index !== -1) {
      this.cartProducts.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartProducts))
      this.notificationService.showSuccess(`${this.translateService.instant('validation.ProductRemovedFromTheCart')}`)
    }
  }
}
