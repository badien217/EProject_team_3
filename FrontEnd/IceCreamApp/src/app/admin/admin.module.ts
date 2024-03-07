// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { AddBookComponent } from './feature/book/add-book/add-book.component';
import { ListBookComponent } from './feature/book/list-book/list-book.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { AddFaqComponent } from './feature/faq/add-faq/add-faq.component';
import { ListFaqComponent } from './feature/faq/list-faq/list-faq.component';
import { ListFeedbackComponent } from './feature/feedback/list-feedback/list-feedback.component';
import { AddProductComponent } from './feature/product/add-product/add-product.component';
import { ListProductComponent } from './feature/product/list-product/list-product.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { ListRecipeComponent } from './feature/recipe/list-recipe/list-recipe.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListOrderComponent } from './feature/order/list-order/list-order.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListUserComponent } from './feature/user/list-user/list-user.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateRecipeComponent } from './feature/recipe/update-recipe/update-recipe.component';
import { UpdateProductComponent } from './feature/product/update-product/update-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateFaqComponent } from './feature/faq/update-faq/update-faq.component';
import { AddFeedbackComponent } from './feature/feedback/add-feedback/add-feedback.component';
import { UpdateFeedbackComponent } from './feature/feedback/update-feedback/update-feedback.component';
import { UpdateOrderComponent } from './feature/order/update-order/update-order.component';
import { ListFlavorComponent } from './feature/flavor/list-flavor/list-flavor.component';
import { AddFlavorComponent } from './feature/flavor/add-flavor/add-flavor.component';
import { UpdateFlavorComponent } from './feature/flavor/update-flavor/update-flavor.component';
import { UpdateBookComponent } from './feature/book/update-book/update-book.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BarChartOrderComponent } from './components/chart-dashboard/bar-chart-order/bar-chart-order.component';
import { DonutChartComponent } from './components/chart-dashboard/donut-chart/donut-chart.component';
import { DonutChartUserComponent } from './components/chart-dashboard/donut-chart-user/donut-chart-user.component';
import { LineChartOrderComponent } from './components/chart-dashboard/line-chart-order/line-chart-order.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  declarations: [
    SidebarComponent,
    AddBookComponent,
    ListBookComponent,
    DashboardComponent,
    AddFaqComponent,
    ListFaqComponent,
    ListFeedbackComponent,
    AddProductComponent,
    ListProductComponent,
    AddRecipeComponent,
    ListRecipeComponent,
    ListOrderComponent,
    ListUserComponent,
    UpdateRecipeComponent,
    UpdateProductComponent,
    UpdateFaqComponent,
    AddFeedbackComponent,
    UpdateFeedbackComponent,
    UpdateOrderComponent,
    ListFlavorComponent,
    AddFlavorComponent,
    UpdateFlavorComponent,
    UpdateBookComponent,
    BarChartOrderComponent,
    DonutChartComponent,
    DonutChartUserComponent,
    LineChartOrderComponent,
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
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    CKEditorModule
  ],
  exports: [
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminModule { }
