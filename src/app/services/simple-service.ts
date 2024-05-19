import { HttpParams } from '@angular/common/http';

export abstract class SimpleService {

  getParams(mapFilter: Map<string, string>) {
    let params = new HttpParams();
    mapFilter.forEach((value: string, key: string, map: Map<string, string>) => {
      if (value != '') {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
