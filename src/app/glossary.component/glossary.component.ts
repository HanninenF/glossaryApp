import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

//TODO: Kolla kurser med angular och träna från scratch
@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [],
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss',
})
export class GlossaryComponent implements OnInit {
  glossary: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const course = params.get('course');
      const url = course
        ? `https://glossaryserver-production.up.railway.app/api/glossary?course=${encodeURIComponent(
            course
          )}`
        : 'https://glossaryserver-production.up.railway.app/api/glossary';

      this.loading = true;
      this.http.get<{ data: any[] }>(url).subscribe({
        next: (response) => {
          const sanitizedGlossary = response.data.map((g) => {
            const term = g.term ?? '(saknar term)';
            return {
              ...g,
              term: term.charAt(0).toUpperCase() + term.slice(1),
            };
          });
          this.glossary = sanitizedGlossary;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message ?? 'Något gick fel';
          this.loading = false;
        },
      });
    });
  }
}
