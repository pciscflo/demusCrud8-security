import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';
import { CreateEditComponent } from './component/author/create-edit/create-edit.component';
import { BookComponent } from './component/book/book.component';
import { CreateEditBookComponent } from './component/book/create-edit-book/create-edit-book.component';
import { AuthorListarComponent } from './component/author/author-listar/author-listar.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardGuard } from './security/auth-guard.guard';

const routes: Routes = [
    {
      path: '', component: LoginComponent
    },
    { path: 'authors', component: AuthorComponent, canActivate: [AuthGuardGuard],
        children: [
        {
           path: 'listar', component: AuthorListarComponent,
        },
        {
           path:'edicion/:id', component: CreateEditComponent
        },
        {
           path: 'nuevo', component: CreateEditComponent
        }
       ]
     }
  ,
  {
    path: 'books', component: BookComponent, children: [
     {
       path: 'nuevo', component: CreateEditBookComponent
     }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
