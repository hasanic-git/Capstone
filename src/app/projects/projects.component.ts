import { Component, OnInit } from '@angular/core';
import { CapstoneService } from '../capstone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  title = 'Capstone Project List';

  //declare variable to hold response and make it public to be accessible from components.html
  public projects: any;

  //initialize the call using CapstoneService 
  constructor(private _capstoneService: CapstoneService, private router: Router) { }

  ngOnInit(): void {
    this.getCapstones();
  }

  getCapstones() {
    this._capstoneService.getCapstones().subscribe({
      next: (data) => { this.projects = data },
      error: (err) => { console.error(err) },
      complete: () => { console.log('finished loading') }
    });
  }

  getProject(projectId: string): any {
    for (let project of this.projects) {
      if (project._id === projectId) {
        return project;
      }
    }
    return null;
  }

  onEdit(projectId: string) {

    let project = this.getProject(projectId);

    if (project != null) {
      let projectStr = JSON.stringify(project);
      this.router.navigate(['/edit-project/', projectId], { queryParams: { data: projectStr }} );
    } else {
      this.router.navigate(['/edit-project/', projectId] );
    }
  }

  onDelete(projectId: string) {
    this._capstoneService.deleteProject(projectId);
  }

}