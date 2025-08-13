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
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';

// Dein User-Interface
// export interface User {
//   birthDate: number;
//   city: string;
//   firstName: string;
//   lastName: string;
//   street: string;
//   zipCode: number;
// }

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  readonly firestore = inject(Firestore);

  // **Hier ist die entscheidende Änderung:**
  // Das Observable wird direkt bei der Deklaration initialisiert.
  // Hier ist die inject()-Funktion gültig und collectionData wird korrekt aufgerufen.
  users$: Observable<User[]> = collectionData(collection(this.firestore, 'users')) as Observable<User[]>;

  // Die ngOnInit()-Methode ist jetzt nicht mehr zwingend nötig,
  // da das Observable bereits initialisiert ist. Du kannst es aber verwenden,
  // um das Observable zu abonnieren, wenn du die Daten direkt in der Komponente
  // benötigst. Die sauberste Lösung ist aber oft, die async-Pipe im Template zu verwenden.

  // ngOnInit(): void {
  //   this.users$.subscribe(changes => {
  //     console.log('Received changes from DB', changes);
  //   });
  // }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}