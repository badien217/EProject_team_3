import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddFaqComponent } from './feature/faq/add-faq/add-faq.component';
import { ListFaqComponent } from './feature/faq/list-faq/list-faq.component';
import { AddProductComponent } from './feature/product/add-product/add-product.component';
import { ListProductComponent } from './feature/product/list-product/list-product.component';
import { AddBookComponent } from './feature/book/add-book/add-book.component';
import { ListBookComponent } from './feature/book/list-book/list-book.component';
import { ListFeedbackComponent } from './feature/feedback/list-feedback/list-feedback.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { ListRecipeComponent } from './feature/recipe/list-recipe/list-recipe.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
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
        component: ListRecipeComponent,
      },
      {
        path: 'recipe-management/add-recipe',
        component: AddRecipeComponent,
      },
      // {
      //   path: 'user-management',
      //   component: ListUserComponent,
      // },
      // {
      //   path: 'order-management',
      //   component: ListOrderComponent,
      // },
      {
        path: 'feedback-management',
        component: ListFeedbackComponent,
      },
      {
        path: 'book-management',
        component: ListBookComponent,
      },
      {
        path: 'book-management/add-book',
        component: AddBookComponent,
      },
      // {
      //   path: 'book-management/detail-book',
      //   component: DetailBookComponent,
      // },
      {
        path: 'product-management',
        component: ListProductComponent,
      },
      {
        path: 'product-management/add-product',
        component: AddProductComponent,
      },
      {
        path: 'faq-management',
        component: ListFaqComponent,
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
