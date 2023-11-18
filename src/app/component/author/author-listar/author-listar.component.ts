import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Author } from 'src/app/model/authors';
import { AuthorService } from 'src/app/service/author.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-author-listar',
  templateUrl: './author-listar.component.html',
  styleUrls: ['./author-listar.component.css']
})
export class AuthorListarComponent implements OnInit{
  lista: Author[] = [];
  displayedColumns = ['id','nameAuthor','emailAuthor','birthDateAuthor','cantidad', 'accion01', 'accion02'];
  dataSource = new MatTableDataSource<Author>();
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private authorService: AuthorService,
     private router: Router, private dialog:MatDialog){
  }
  ngOnInit(): void {
      //Nos suscribimos al observable list
   this.authorService.list().subscribe({next:data => {
      let newData = this.logica(data);
      this.dataSource.data = newData;}
   });
    //El Observable suscribe a un observator para que actualice la data cuando le envíen
    //Nos suscribimos al observable getLista
   this.authorService.getLista().subscribe(data => {
      let newData = this.logica(data);
      this.dataSource.data = newData;
   });
  }

  logica(data:any){
    for(var i = 0; i < data.length; i++)
    {
        if (data[i].nameAuthor.includes('Juana')){
          data[i].cantidad = i*10;//call rule
        }
    }
    return data;
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(id: string){
     const dialogRef = this.dialog.open(DialogoComponent);
     dialogRef.afterClosed().subscribe(result => {
        if(result){
           this.delete(id);
        }else{
          console.log("FALSE");
        }
     });
  }

  delete(id: string) {
    this.authorService.delete(id).subscribe(() => {
      this.authorService.list().subscribe(data => {
        this.authorService.setList(data);
      })
    });
  }

  buscar(name: string){
   this.authorService.listName(name).subscribe(data => {
        this.authorService.setList(data);
    });
  }

  listar(){
    this.authorService.list().subscribe(data => {
        this.authorService.setList(data);
    });
  }
}
