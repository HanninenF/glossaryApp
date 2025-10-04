import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const course = params.get('course');
      const url = course
        ? `http://localhost:3000/api/glossary?course=${encodeURIComponent(course)}`
        : 'http://localhost:3000/api/glossary';

      this.loading = true;
      this.http.get<{ data: any[] }>(url).subscribe({
        next: (response) => {
          this.glossary = response.data;
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
