import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JitsiService } from '../services/jitsi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAudioMuted: any;
    constructor(private router: Router, private jitsiService: JitsiService) {}
    ngOnInit(): void {
      this.jitsiService.moveRoom(this.jitsiService.namePrincipalRoom);
      
    }
  }
