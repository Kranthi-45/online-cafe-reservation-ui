import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/interfaces/table.model';
import { TableService } from 'src/app/services/table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableId: any ;
  foundTable: Table | null = null;
  notFound = "";

  tables: Table[] = [];
  filteredTables: Table[] = [];
  selectedTableType: string = '';
  reservationSuccessMessage: string = '';
  reservationErrorMessage: string = '';

  allTableData : any;
  commonTableResult : any
  displayTable = true;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, private ts: TableService
  ) {}
  ngOnInit(): void {
    this.loadTables();
  }

  searchTable() {
   this.selectedTableType = "";
    this.displayTable = false;
    this.notFound = '';
    setTimeout(() => {
      this.displayTable = true;
    }, 500);
    this.commonTableResult = this.allTableData;
    // this.notFound = true; // Mark that search has been performed
    console.log('Searching for table with ID:', this.tableId);

    this.ts.getTablesById(this.tableId).subscribe(
      (response: any) => {
        if (response && response.id) {
          console.log('Table found:', response);
          // this.foundTable = {
          this.commonTableResult  = Array.isArray(response) ? response : [response];
        } else {
          this.notFound = 'Table not found with ID: ' +  this.tableId.toString();
          console.log('Table not found with ID:', this.tableId);
          this.commonTableResult = null;
        }
      },
      (error) => {
        if (error.status === 404) {
          this.notFound = 'Table not found with ID: ' +  this.tableId.toString();
          console.log('Table not found with ID:', this.tableId);
          this.commonTableResult = null;
        } else {
          this.notFound = 'Error searching for table';
          console.error('Error searching for table:', error);
          // Handle other error cases here
          this.commonTableResult = null; // Reset foundTable in case of other errors
        }
      }
    );
  }

  loadTables() {
    this.displayTable = false;
    setTimeout(() => {
      this.displayTable = true;
    }, 500);
    this.ts.getAllTables().subscribe(
      (data) => {
        // this.tables = data;
        this.commonTableResult = data;
        this.allTableData = data;
        this.filterTables();
      },
      (error) => {
        console.log('Error loading tables:', error);
      }
    );
  }

  filterTables() {
    this.tableId = "";
    this.notFound = '';
    this.displayTable = false;
    setTimeout(() => {
      this.displayTable = true;
    }, 500);
    this.commonTableResult = this.allTableData;
    console.log('Selected Table Type:', this.selectedTableType);
    if (this.selectedTableType === '') {
      // this.filteredTables = this.tables.slice();
      this.commonTableResult = this.commonTableResult.slice();
    } else {
      // this.filteredTables = this.tables.filter(table => table.tableType === this.selectedTableType);
      this.commonTableResult = this.commonTableResult.filter((table : any) => table.tableType === this.selectedTableType);
    }
    // console.log('Filtered Tables:', this.filteredTables);
    console.log('Filtered Tables:', this.commonTableResult);
    this.reservationErrorMessage = '';
  }
  reserveTable(table: any) {
    if (table.tableStatus === 'Reserved') {
      return;
    }
  
    this.ts.reserveTable(table.id).subscribe(
      (response : any) => {
        if (response.message === 'Table reserved successfully.') {
          table.tableStatus = 'Reserved';
          localStorage.setItem("table",JSON.stringify(response));
          alert('Table reserved successfully.'); 
        } else {
          alert('Error reserving table.'); 
        }
      }
      //,
      // (error : any) => {
      //   console.error(error);
      //   alert('Error reserving table.'); 
      // }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
