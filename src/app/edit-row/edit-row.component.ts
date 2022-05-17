import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userValues } from '../constants';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.css'],
})
export class EditRowComponent implements OnInit {


  action: any;
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<EditRowComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: userValues
  ) {


    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit(): void {}
}
