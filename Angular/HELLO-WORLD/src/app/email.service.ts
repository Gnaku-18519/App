import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';

@Injectable({ //this decorator is needed only when this service has dependencies in its constructor
  providedIn: 'root'
})

export class EmailService {

  constructor(logService: CoursesService) { }

}
