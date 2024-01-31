import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddFaqComponent } from './feature/faq/add-faq/add-faq.component';
import { FaqListComponent } from './feature/faq/faq-list/faq-list.component';
import { AddProductComponent } from './feature/product/add-product/add-product.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { BookDetailComponent } from './feature/book/book-detail/book-detail.component';
import { AddBookComponent } from './feature/book/add-book/add-book.component';
import { BookListComponent } from './feature/book/book-list/book-list.component';
import { FeedbackListComponent } from './feature/feedback/feedback-list/feedback-list.component';
import { OrderListComponent } from './feature/order/order-list/order-list.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { RecipeListComponent } from './feature/recipe/recipe-list/recipe-list.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard',
  },
  {
    path: 'admin/dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'recipe-management',
        component: RecipeListComponent,
      },
      {
        path: 'recipe-management/add-recipe',
        component: AddRecipeComponent,
      },
      {
        path: 'user-management',
        component: UserListComponent,
      },
      {
        path: 'order-management',
        component: OrderListComponent,
      },
      {
        path: 'feedback-management',
        component: FeedbackListComponent,
      },
      {
        path: 'book-management',
        component: BookListComponent,
      },
      {
        path: 'book-management/add-book',
        component: AddBookComponent,
      },
      {
        path: 'book-management/detail-book',
        component: BookDetailComponent,
      },
      {
        path: 'product-management',
        component: ProductListComponent,
      },
      {
        path: 'product-management/add-product',
        component: AddProductComponent,
      },
      {
        path: 'faq-management',
        component: FaqListComponent,
      },
      {
        path: 'faq-management/add-faq',
        component: AddFaqComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
