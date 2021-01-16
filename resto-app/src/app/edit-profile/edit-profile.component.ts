import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  isEdit: any;
  userDetails: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: RestoService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      "fullName": new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "address": new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      "phone": new FormControl(null, [Validators.required, Validators.minLength(10)])

    });
    this.route.queryParams.subscribe(param => {
      this.isEdit = param.id;
      if (this.isEdit) {
        this.getUserById();
      }
    })
  }
  getUserById() {
    this.service.getUserProfile().subscribe(
      res => {

        this.userDetails = res['user'];
        this.setForm(this.userDetails)
      },
      err => { console.log(err); }
    )
  }
  setForm(data) {
    this.editForm.patchValue({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone

    })
  }
  onSubmit() {
    let data = {
      fullName: this.editForm.value.fullName,
      email: this.editForm.value.email,
      address: this.editForm.value.address,
      phone: this.editForm.value.phone
    }


    this.service.updateUser(this.userDetails._id,data).subscribe(
      res => {
        this.toastr.success("updated!");
        this.router.navigate(['/profile'])

      })
  }
}
