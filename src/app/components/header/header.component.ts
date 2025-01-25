import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from '../../shared/services/cart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //init vars
  cartApi = inject(CartService);
  translateService = inject(TranslateService);
  show: boolean = false;
  dropdownOpen: boolean = false;
  currentLang: string = 'En';
  lang: string = 'en';
  //end

  ngOnInit(): void { }

  //get the count of prods in the cart
  getCartProductCount(): number {
    return this.cartApi.getCartProductCount();
  }

  //opencloas the menu
  changeTheMenu() {
    this.show = !this.show;
  }

  //openclose the dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(lang: string) {
    this.lang = lang;
    this.translateService.setDefaultLang(lang);
    const formattedLang = this.capitalizeFirstLetter(lang);
    this.translateService.get(`validation.${formattedLang}`).subscribe(translation => {
      this.currentLang = translation;

      if (lang === 'ar') {
        document.body.classList.add('rtl'); // Add RTL class for Arabic
      } else {
        document.body.classList.remove('rtl'); // Remove RTL class for other languages
      }
    });
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const languageDropdown = document.getElementById('languageDropdown');

    // Close dropdown if click is outside of the dropdown
    if (languageDropdown && !languageDropdown.contains(target)) {
      this.dropdownOpen = false;
    }
  }

  private capitalizeFirstLetter(lang: string): string {
    return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
  }
}