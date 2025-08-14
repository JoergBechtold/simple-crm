import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  standalone: true,
  selector: 'app-user-detail',
  imports: [MatCardModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  user$: Observable<User> = this.route.paramMap.pipe(
    switchMap(params => {
      const userId = params.get('id');
      const userDoc = doc(this.firestore, `users/${userId}`);
      return docData(userDoc) as Observable<User>;
    })
  );


  editMenu() {

  }

  editUser() {

  }
}