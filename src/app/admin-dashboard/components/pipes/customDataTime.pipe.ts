import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formats a /Date(XXXXXXXXXXXXXXXX)/ string into a JSON Date object
 * Takes an argument as input of actual date value in /Date(XXXXXXXXXXXXXXXX)/ format.
 * Usage:
 *   date-value | customDateFormat
 * Example:
 *   {{ '/Date(1402034400000)/' | customDateFormat}}
 *   formats to: "2014-06-06T06:00:00.000Z"
*/
@Pipe({name: 'customDateFormat'})
export class CustomDataTimePipe implements PipeTransform {
  transform(value: any): Date {
    var myDate = new Date(value.match(/\d+/)[0] * 1);
    return  myDate;
  }
}
