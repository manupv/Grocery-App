import { Pipe, PipeTransform } from '@angular/core';
let humanize = require('string-humanize');

@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {
  public transform(input:string): string{
    	if ((typeof input) !== 'string') {
			return input;
		}
		if (!input) {
			return '';
		}	
		return humanize(input);
	}

}

// export class HumanizePipe implements PipeTransform {
// 	public transform(input:string) {
// 		if ((typeof input) !== 'string') {
// 			return input;
// 		}
// 		if (!input) {
// 			return '';
// 		}	
// 		input = input.split(/(?=[A-Z])/).join(' ');
// 		input = input[0].toUpperCase() + input.slice(1);
// 		return input;
// 	}
// }
