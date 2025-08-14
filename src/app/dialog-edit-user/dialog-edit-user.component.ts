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
import { provideNativeDateAdapter } from '@angular/material/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';




@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressBarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  public user: User;
  private userData: any = inject(MAT_DIALOG_DATA);
  public dialogRef: MatDialogRef<DialogEditUserComponent> = inject(MatDialogRef);
  private firestore: Firestore = inject(Firestore);


  isLoading = false;
  birthDate: Date;

  constructor() {
    this.user = new User(this.userData);
    this.birthDate = new Date(this.user.birthDate);
  }

  async saveUserDialog() {
    this.isLoading = true;
    this.user.birthDate = this.birthDate.getTime();

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
