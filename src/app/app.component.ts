import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'Assine Telecine'; 
  hide_loading = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
    ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.hide_loading = false;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.hide_loading = true;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.cdr.detectChanges();
    }, 2000);
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }
}
