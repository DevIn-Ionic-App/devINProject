import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'now'
})
export class NowPipe implements PipeTransform {

  transform(value: any): string {
    const now = moment();
    const date = moment(value);
    const diff = moment.duration(now.diff(date));

    if (diff.asSeconds() < 60) {
      return 'just now';
    } else if (diff.asMinutes() < 60) {
      return `${Math.floor(diff.asMinutes())}m ago`;
    } else if (diff.asHours() < 24) {
      return `${Math.floor(diff.asHours())}h ago`;
    } else {
      return `${Math.floor(diff.asDays())}d ago`;
    }
  }
}
