import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileToUmageUrl',
  standalone: true
})
export class FileToUmageUrlPipe implements PipeTransform {


  transform(value: File): string {
    return value ? URL.createObjectURL(value) : '';
  }

}
