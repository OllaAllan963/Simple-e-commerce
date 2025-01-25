import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  translateService = inject(TranslateService);

  setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}
