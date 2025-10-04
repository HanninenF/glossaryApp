import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlossaryComponent } from './glossary.component/glossary.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlossaryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('glossaryApp');
}
