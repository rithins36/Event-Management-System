// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-main',
//   standalone: true,
//   imports: [],
//   templateUrl: './main.component.html',
//   styleUrl: './main.component.css'
// })
// export class MainComponent {

// }
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  // Reference to the features section
  @ViewChild('featuresSection') featuresSection!: ElementRef;

  scrollToFeatures() {
    this.featuresSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
