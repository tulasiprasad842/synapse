import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
import { INotify } from '../_model/setnotification.model';

@Pipe({
  name: 'Notificationfilter'
})

export class NotifyFilterPipe implements PipeTransform {
  transform(value: INotify[], data: INotify[], filter: string, caseInsensitive: boolean): any {
    if (filter) {
      return _.filter(data, row => row.notificationName.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    } else {
      return value;
    }
  }
}