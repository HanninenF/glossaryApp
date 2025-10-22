import { Routes } from '@angular/router';
import { GlossaryComponent } from './glossary.component/glossary.component';

export const routes: Routes = [
  { path: 'glossary', component: GlossaryComponent }, // ✅ route för /glossary
  { path: '', redirectTo: 'glossary', pathMatch: 'full' }, // ✅ starta på /glossary
  { path: '**', redirectTo: 'glossary' }, // ✅ fånga övrigt
];
