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
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-user',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  readonly firestore = inject(Firestore);

  users$: Observable<User[]> = collectionData(collection(this.firestore, 'users'), { idField: 'customIdName' }) as Observable<User[]>;


  // ngOnInit(): void {
  //   this.users$.subscribe(changes => {
  //     console.log('Received changes from DB:', changes);
  //   });
  // }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}