import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddBookComponent } from './feature/book/add-book/add-book.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { ListBookComponent } from './feature/book/list-book/list-book.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { AddFaqComponent } from './feature/faq/add-faq/add-faq.component';
import { ListFaqComponent } from './feature/faq/list-faq/list-faq.component';
import { ListFeedbackComponent } from './feature/feedback/list-feedback/list-feedback.component';
import { AddProductComponent } from './feature/product/add-product/add-product.component';
import { ListProductComponent } from './feature/product/list-product/list-product.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { ListRecipeComponent } from './feature/recipe/list-recipe/list-recipe.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    AddBookComponent,
    SidebarComponent,
    ListBookComponent,
    DashboardComponent,
    AddFaqComponent,
    ListFaqComponent,
    ListFeedbackComponent,
    AddProductComponent,
    ListProductComponent,
    AddRecipeComponent,
    ListRecipeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class AdminModule { }
