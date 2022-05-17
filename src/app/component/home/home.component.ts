import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EditRowComponent } from 'src/app/edit-row/edit-row.component';
import { HomeService } from 'src/app/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { findIndex } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Application';
  unselect = false;
  personDetail = [];
  allSelected = false;
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'email',
    'role',
    'action',
  ];
  pageSize: any = 10;
  tempData: any = [];
  values: any;
  v: any;
  multiSelect: number[] = [];
  checked = '';

  constructor(private home: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.home.getData().subscribe((data) => {
      this.personDetail = data;
      console.log(this.personDetail);
      this.tempData = this.personDetail.slice(0, this.pageSize);
    });
  }

  onPageChange(event: any) {
    this.tempData = this.personDetail.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
    console.log(event.pageIndex, event.pageSize);
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateRowData(result.data);
    });
  }

  updateRowData(row_obj: any) {
    this.tempData = this.tempData.filter((value: any, key: any) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.email = row_obj.email;
      }
      return true;
    });
  }

  removeSelectedRows(value: any) {
    console.log(value);
    this.personDetail = this.personDetail.filter((a: any) => !(a.id == value));
    this.tempData = this.tempData.filter((a: any) => !(a.id == value));
    console.log(this.tempData);
  }

  // onClickCheckBox(value: number) {
  //   console.log(value);
  //   const index = this.multiSelect.indexOf(value);
  //   if (index < 0) {
  //     this.multiSelect.push(value);
  //   } else {
  //     this.multiSelect.splice(index, 1);
  //   }
  //   console.log(this.multiSelect);
  // }

  onClickMultipleRowDelete() {
    this.tempData = this.tempData.filter(
      (a: any) => !this.multiSelect.includes(a.id)
    );
  }

  deletedvalues() {
    this.personDetail = this.personDetail.filter((a: any) => !a.checked);
    this.tempData = this.tempData.filter((a: any) => !a.checked);
    console.log(this.tempData);
    //  this.tempData=this.personDetail
  }

  applyFilter(event: any) {
    this.v = event.target.value;
    console.log(this.v);

    this.tempData = this.personDetail.filter((value: any) => {
      return (
        value.name.toLowerCase().includes(this.v.toLowerCase()) ||
        value.id.indexOf(this.v) > -1 ||
        value.email.indexOf(this.v) > -1 ||
        value.role.indexOf(this.v) > -1
      );
    });
  }

  toggle() {
    if (this.checked) {
      this.tempData.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      this.tempData.forEach((element: any) => {
        element.checked = false;
      });
    }
  }
}
