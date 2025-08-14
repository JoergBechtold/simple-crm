import { Component, inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  public user: User;
  public userData: User = inject(MAT_DIALOG_DATA);
  public dialogRef: MatDialogRef<DialogEditAddressComponent> = inject(MatDialogRef);
  private firestore: Firestore = inject(Firestore);

  isLoading = false;

  constructor() {
    this.user = new User(this.userData);
  }

  async saveAddressDialog() {
    this.isLoading = true;

    const userDocRef = doc(this.firestore, `users/${this.user.customIdName}`);

    try {
      await updateDoc(userDocRef, this.user.toJson());
      this.isLoading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error("Error updating document: ", error);
      this.isLoading = false;
    }
  }
}