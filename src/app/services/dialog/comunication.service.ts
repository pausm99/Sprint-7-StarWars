import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private closeDialogSubject = new Subject<void>();

  public closeDialog = this.closeDialogSubject.asObservable();

  closeDialogFunction() {
    this.closeDialogSubject.next();
  }
}
