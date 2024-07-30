import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
    standalone: true,
})
export class DurationPipe implements PipeTransform {
    /**
     * The function transforms a value representing minutes into hours and minutes format.
     * @param {string | number} value - The `transform` function takes a parameter `value` which can be
     * either a string or a number. The function first checks the type of `value`, converts it to a
     * number if it's a string, then calculates the hours and minutes from the total minutes provided
     * in the `value`. Finally,
     * @returns The `transform` function takes a value as a parameter, which can be either a string or
     * a number. It transforms the value into a number, calculates the hours and minutes from the
     * value, and returns a string in the format `h min`.
     */
    transform(value: string | number): string {
        const valueTransform = typeof value === 'string' ? Number(value) : value;
        const hours = Math.floor(valueTransform / 60);
        const minutes = valueTransform % 60;
        return `${hours}h ${minutes}min`;
    }
}
