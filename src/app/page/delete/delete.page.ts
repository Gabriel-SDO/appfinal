import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  public id: any;
  public apiURL = 'http://localhost:3000/';

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public route: Router
  ) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.delete(this.apiURL + `projetos/${this.id}`).subscribe(() => {
      this.route.navigate([
        "/projetos"
      ])
    });


  }

  ngOnInit() {
  }

}
