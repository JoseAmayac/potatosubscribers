import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      Name: new FormControl('',[Validators.required]),
      Email: new FormControl(''),
      CountryCode: new FormControl(''),
      CountryName: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

}
