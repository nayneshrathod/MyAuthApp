import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyAuthApp';
  rForm: FormGroup;
  post: any;
  descrpition = '';
  name = '';
  errortitle = 'this field is required';

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      name: [null, Validators.required],
      descrpition: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(300)])],
      validate: ''
    });
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe((validate) => {
        if (validate.value == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(30)]);
          this.errortitle = 'You need to specipy atleat 3 charctor';
        } else {
          this.rForm.get('name').setValidators([Validators.required]);
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    );
  }

  addPost(post) {
    this.name = post.name;
    this.descrpition = post.description;
  }
}
