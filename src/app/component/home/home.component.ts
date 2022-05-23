import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EditRowComponent } from 'src/app/edit-row/edit-row.component';
import { HomeService } from 'src/app/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { findIndex } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface UserData {
  id: number;
  email: string;
  role:string
}
const USER_DATA: UserData[] = [];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {

  length: number;
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
  pageSize: any = '';
  tempData: any = [];
  values: any;
  v: any;
  multiSelect: number[] = [];
  checked = '';
  dataSource = new MatTableDataSource<UserData>(USER_DATA);
  CurrentPageVAlues:any
  
  // @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
}

  constructor(private home: HomeService, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.home.getData().subscribe((data) => {
      this.personDetail= data;
      console.log(this.personDetail);
      this.dataSource.data=data
    });
  }


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.dataSource.data= this.dataSource.data.filter((value: any, key: any) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.email = row_obj.email;
        value.role = row_obj.role;
      }
      return true;
    });
  }

  removeSelectedRows(value: any) {
    console.log(value);
    this.dataSource.data = this.dataSource.data.filter((a: any) => !(a.id == value));
    console.log(this.tempData);
  }


  onClickMultipleRowDelete() {
    this.dataSource.data = this.dataSource.data.filter(
      (a: any) => !this.multiSelect.includes(a.id)
    );
  }

  deletedvalues() {
    if(this.checked){
    this.CurrentPageVAlues=this.dataSource.paginator?.pageSize
    this.checked=''
    this.dataSource.data= this.dataSource.data.splice(this.CurrentPageVAlues, this.dataSource.data.length);
    this.toggle()
    console.log(this.dataSource.paginator?.pageSize)
  
  
  }else{
    this.dataSource.data=this.dataSource.data.filter((value:any)=>!(value.checked))
  }
    
  }

  toggle() {
    if (this.checked) {
      this.dataSource.data.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      this.dataSource.data.forEach((element: any) => {
        element.checked = false;
      });
    }
  }
}
