import { FormGroup, FormControl } from '@angular/forms';
import { Basic } from 'unsplash-js/dist/methods/photos/types';

export type ImageFormType = FormGroup<{
  orderBy: FormControl<string | null>;
  type: FormControl<string | null>;
}>;

export type OrderBy = 'relevant' | 'latest' | 'editorial';
/**
 * The function `isOrderBy` checks if a given string value is one of 'relevant', 'latest', or
 * 'editorial'.
 * @param {string} value - The `isOrderBy` function is checking if the `value` parameter is one of the
 * strings 'relevant', 'latest', or 'editorial'. If the `value` is one of these strings, the function
 * will return `true`, indicating that the `value` is of type `OrderBy`.
 * @returns The function `isOrderBy` is returning a boolean value indicating whether the input `value`
 * is one of the strings 'relevant', 'latest', or 'editorial'.
 */
export function isOrderBy(value: string): value is OrderBy {
  return ['relevant', 'latest', 'editorial'].includes(value);
}

export type ImagesPaginator = {
  results: Basic[];
  total: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
};
