import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { BookListComponent } from './feature/book/book-list/book-list.component';
import { AddBookComponent } from './feature/book/add-book/add-book.component';
import { BookDetailComponent } from './feature/book/book-detail/book-detail.component';
import { UpdateBookComponent } from './feature/book/update-book/update-book.component';
import { DeleteBookComponent } from './feature/book/delete-book/delete-book.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { FaqListComponent } from './feature/faq/faq-list/faq-list.component';
import { AddFaqComponent } from './feature/faq/add-faq/add-faq.component';
import { UpdateFaqComponent } from './feature/faq/update-faq/update-faq.component';
import { DeleteFaqComponent } from './feature/faq/delete-faq/delete-faq.component';
import { FeedbackListComponent } from './feature/feedback/feedback-list/feedback-list.component';
import { FlavorListComponent } from './feature/flavor/flavor-list/flavor-list.component';
import { AddFlavorComponent } from './feature/flavor/add-flavor/add-flavor.component';
import { UpdateFlavorComponent } from './feature/flavor/update-flavor/update-flavor.component';
import { DeleteFlavorComponent } from './feature/flavor/delete-flavor/delete-flavor.component';
import { OrderListComponent } from './feature/order/order-list/order-list.component';
import { UpdateOrderComponent } from './feature/order/update-order/update-order.component';
import { DeleteOrderComponent } from './feature/order/delete-order/delete-order.component';
import { OrderDetailComponent } from './feature/order/order-detail/order-detail.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { AddProductComponent } from './feature/product/add-product/add-product.component';
import { UpdateProductComponent } from './feature/product/update-product/update-product.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { DeleteProductComponent } from './feature/product/delete-product/delete-product.component';
import { RecipeListComponent } from './feature/recipe/recipe-list/recipe-list.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { UpdateRecipeComponent } from './feature/recipe/update-recipe/update-recipe.component';
import { DeleteRecipeComponent } from './feature/recipe/delete-recipe/delete-recipe.component';
import { RecipeDetailComponent } from './feature/recipe/recipe-detail/recipe-detail.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './feature/logout/logout.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    BookListComponent,
    AddBookComponent,
    BookDetailComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    DashboardComponent,
    FaqListComponent,
    AddFaqComponent,
    UpdateFaqComponent,
    DeleteFaqComponent,
    FeedbackListComponent,
    FlavorListComponent,
    AddFlavorComponent,
    UpdateFlavorComponent,
    DeleteFlavorComponent,
    OrderListComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
    OrderDetailComponent,
    ProductListComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDetailComponent,
    DeleteProductComponent,
    RecipeListComponent,
    AddRecipeComponent,
    UpdateRecipeComponent,
    DeleteRecipeComponent,
    RecipeDetailComponent,
    UserListComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class AdminModule { }
