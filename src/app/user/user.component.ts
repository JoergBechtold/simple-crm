import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface User {
  // Annahme: Deine Benutzer haben ein 'name'-Feld und ein 'id'-Feld
  id?: string;
  name: string;
  // ... weitere Felder
}



@Component({
  standalone: true,
  selector: 'app-user',
  imports: [MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  readonly firestore = inject(Firestore);

  users$!: Observable<User[]>;

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;

    this.users$.subscribe(changes => {
      console.log('Received changes from DB', changes);
    });
  }



  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}
