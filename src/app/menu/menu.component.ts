import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContext } from '../services/app.context';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private appContext: AppContext
  ) { }

  ngOnInit() {

  }

  openGame(gameMode: string){
    this.appContext.updateGameMode({gameMode: gameMode});
    this.router.navigate(['gameview']);
  }
}