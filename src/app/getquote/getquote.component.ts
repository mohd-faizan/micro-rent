import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MyDialogueComponent } from "../my-dialogue/my-dialogue.component"
import { MatDialog } from '@angular/material';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
@Component({
  selector: 'app-getquote',
  templateUrl: './getquote.component.html',
  styleUrls: ['./getquote.component.css']
})
export class GetquoteComponent implements OnInit {
  @ViewChild('success') success: SwalComponent;
  @ViewChild('delete') delete: SwalComponent;
  constructor(private _userService: UserService, public dialog: MatDialog) { }
  getQoute: FormGroup;
  ngOnInit() {
    this.getQoute = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }
  /*onSubmit(form){
    this._userService.postQuote(form.value,true)
      .subscribe((data)=>{
        console.log(data);
      })
  }*/
  onSubmit(form) {
    form.value.isqoute = true;
    this._userService.postQuote(form.value)
      .then((resp) => {
        // const dialogRef = this.dialog.open(MyDialogueComponent, {
        //   height: '200px',
        //   width: '200px',
        //   data: {message:"Thanks For Your Response. Our Team Will contact you Soon!"}
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //   window.location.href = "./";
        // });
        this.success.show()
          .then(() => { form.reset() })
      }, (err) => {
        this.delete.show()
          .then(() => { form.reset() })
      });
  }

}
