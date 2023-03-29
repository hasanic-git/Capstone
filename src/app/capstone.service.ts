import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CapstoneService {

    private apiUrl = 'http://localhost:8000/capstone';

    constructor(private http: HttpClient, private router: Router) { }

    // Uses http.get() to load data 
    getCapstones() {
        return this.http.get('http://localhost:8000/capstone');
    }

    //Uses http.post() to post data 
    addCapstone(capstone: any) {
        this.http.post('http://localhost:8000/capstone', capstone)
            .pipe(
                catchError((error) => {
                    console.error('POST request failed', error);
                    return of(null); // You can also return a default value if needed
                })
            )
            .subscribe((response) => {
                console.log('POST message:', response);
                if (response) {
                    //successful
                    this.navigateToProjects();
                }
            });
    }

    //Uses http.post() to post data 
    updateCapstone(projectId: string, capstone: any) {

        let endPointUrl = this.apiUrl + "/" + projectId;

        this.http.put(endPointUrl, capstone)
        // .subscribe(data => {
        //   console.log(data);
        // });
        .pipe(
            catchError((error) => {
                console.error('POST request failed', error);
                return of(null); // You can also return a default value if needed
            })
        )
        .subscribe((response) => {
            console.log('PUT message:', response);
            if (response) {
                //successful
                this.navigateToProjects();
            }
        });
    }

    deleteProject(projectId: string) {
        let endPointUrl = this.apiUrl + "/" + projectId;
        this.http.delete(endPointUrl)
            .subscribe(() => {
                console.log('Deleted: ' + projectId);
                this.reloadPage();
            });
    }

    reloadPage() {
        window.location.reload()
    }

    navigateToProjects() {
        this.router.navigateByUrl('/projects')
    }

}
