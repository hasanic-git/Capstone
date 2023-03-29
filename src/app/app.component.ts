import { Component, OnInit } from '@angular/core';
import { CapstoneService } from './capstone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Capstone';
  //declare variable to hold response and make it public to be accessible from components.html
  public capstones: any;

  //initialize the call using CapstoneService 
  //constructor(private _myService: CapstoneService) { }

  ngOnInit() {
    
  }

}
