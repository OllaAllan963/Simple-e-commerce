import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartApi = inject(CartService);
  show: boolean = false;

  getCartProductCount(): number {
    return this.cartApi.getCartProductCount()
  }

  changeTheMenu() {
    if (this.show === false) {
      this.show = true
    } else {
      this.show = false
    }
  }
}
