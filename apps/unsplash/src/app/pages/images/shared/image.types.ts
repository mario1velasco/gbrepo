import { FormGroup, FormControl } from '@angular/forms';

export type OrderBy = 'relevant' | 'latest' | 'editorial';

export type ImageFormType = FormGroup<{
  orderBy: FormControl<string | null>;
  type: FormControl<string | null>;
}>;
