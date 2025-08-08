import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-user',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User {

}
