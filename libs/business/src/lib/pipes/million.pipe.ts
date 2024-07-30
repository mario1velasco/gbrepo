import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'million',
    standalone: true,
})
export class MillionPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }
        // Check if the value is a range or a single value
        const parts = value.split('-');
        if (parts.length === 2) {
            // It's a range
            return `$${parts[0]}-${parts[1]} million`;
        } else {
            // It's a single value
            return `$${value} million`;
        }
    }
}
