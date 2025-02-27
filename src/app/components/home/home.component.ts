import { Component, inject } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../models/Product';
import { ProductService } from '../../shared/services/product.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //variables
  products: Array<Product> = [];
  productS = inject(ProductService);
  //end variables

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.productS.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
