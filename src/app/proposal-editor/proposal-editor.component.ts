import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import ZipCodes from 'src/assets/zip-codes.json';
import { CapstoneService } from '../capstone.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.css']
})

export class ProposalEditorComponent implements OnInit {

  title = "New Capstone Project Proposal Form";
  zipCodes: { zip_code: number, city: string, state: string }[] = ZipCodes;
  project: any;
  routePath: string = "add-project"
  private projectId: string | null = null;
  public isEditing: boolean = false;

  proposalForm = new FormGroup({
    contactName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    jobTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    contactEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contactPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    address: new FormGroup({
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      zip: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    }),

    projectTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    projectDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    technicalSkill: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

  });

  //initialize the call using CapstoneService 
  constructor(private _myService: CapstoneService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const urlPath = this.route.snapshot.url[0].path;
    this.projectId = this.route.snapshot.paramMap.get('_id');
    this.updatePathInfo(urlPath);

    const data = this.route.snapshot.queryParamMap.get('data');
    if (data != null) {
      const parsedData = JSON.parse(data);
      this.fillUpFormData(parsedData);
    }

    this.route.url.subscribe(url => {
      this.updatePathInfo(url[0].path);
    });

    this.route.paramMap.subscribe(paramMap => {
      this.projectId = paramMap.get('_id');

    });
  }

  updatePathInfo(routePath: string) {
    if (routePath === "edit-project" && this.projectId != null) {
      this.isEditing = true;
      this.title = "Update Existing Capstone Project Proposal Form";
    } else {
      this.isEditing = false;
      this.projectId = null;
      this.title = "New Capstone Project Proposal Form";
    }
  }

  fillUpFormData(data: any) {

    /*const validKeys = [
      "contactName",
      "jobTitle",
      "contactEmail",
      "contactPhone",
      "address",
      "projectTitle",
      "projectDescription",
      "technicalSkill"
    ]
    Object.keys(data).forEach((key) => validKeys.includes(key) || delete data[key]);
    //const updatedData = JSON.parse(JSON.stringify(data));
    //console.log("updated data: ", updatedData)
    //this.proposalForm.setValue(updatedData);
    */

    this.proposalForm.setValue({
      contactName: data.contactName,
      jobTitle: data.jobTitle,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zip: data.address.zip
      },
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      technicalSkill: data.technicalSkill
    });
  }


  onSubmit() {
    console.log(this.proposalForm.value);

    let formObj = this.proposalForm.getRawValue();
    //let serializedForm = JSON.stringify(formObj);
    //this._myService.addStudents(this.firstName ,this.lastName);

    if (this.isEditing, this.projectId != null) {
      this._myService.updateCapstone(this.projectId, formObj);
    } else {
      this._myService.addCapstone(formObj);
    }

    //reload the contents
    // call the get api
    //window.location.reload();
  }

  zipCodeChanged() {

    let zipCodeStr = this.proposalForm.value.address?.zip;

    if (!zipCodeStr) {
      this.resetCityInfo();
      return;
    }

    if (!isNaN(Number(zipCodeStr))) {
      let zipCode = Number(zipCodeStr);
      console.log('zipCode is Number: %s', zipCode);
      this.findCityInfo(zipCode);
    } else {
      console.log('zipCode is Str: %s', zipCodeStr);
      this.resetCityInfo();
    }
  }

  resetCityInfo() {
    this.proposalForm.patchValue({
      address: {
        city: '',
        state: ''
      }
    });
  }

  findCityInfo(zipCode: Number) {
    var success: boolean = false;

    for (var zipCodeObj of this.zipCodes) {
      if (zipCodeObj.zip_code == zipCode) {
        success = true;
        this.proposalForm.patchValue({
          address: {
            city: zipCodeObj.city,
            state: zipCodeObj.state
          }
        });
        break;
      }
    }

    if (!success) {
      this.resetCityInfo();
    }
  }

}
