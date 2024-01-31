import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'phonePipe'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    console.log('value', value)
    const number1 = value.substring(0, value.length - 10);
    const number2 = value.substring(2, value.length - 7);
    return `${number1} - ${number2} xxx - xx - xx`;
  }
}
