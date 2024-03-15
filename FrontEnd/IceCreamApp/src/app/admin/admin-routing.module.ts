import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFaqComponent } from './feature/faq/list-faq/list-faq.component';
import { ListProductComponent } from './feature/product/list-product/list-product.component';
import { ListBookComponent } from './feature/book/list-book/list-book.component';
import { ListFeedbackComponent } from './feature/feedback/list-feedback/list-feedback.component';
import { AddRecipeComponent } from './feature/recipe/add-recipe/add-recipe.component';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { ListRecipeComponent } from './feature/recipe/list-recipe/list-recipe.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { ListOrderComponent } from './feature/order/list-order/list-order.component';
import { ListUserComponent } from './feature/user/list-user/list-user.component';
import { UpdateRecipeComponent } from './feature/recipe/update-recipe/update-recipe.component';
import { ListFlavorComponent } from './feature/flavor/list-flavor/list-flavor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard',
  },
  {
    path: 'admin/dashboard',
    canActivate: [AdminAuthGuard],
    title: 'Admin | Dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Admin | Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'recipe-management',
        title: 'Admin | Recipe Management',
        component: ListRecipeComponent,
      },
      {
        path: 'recipe-management/add-recipe',
        title: 'Admin | Create Recipe',
        component: AddRecipeComponent,
      },
      {
        path: 'recipe-management/update-recipe/:id',
        title: 'Admin | Update Recipe',
        component: UpdateRecipeComponent,
      },
      {
        path: 'user-management',
        title: 'Admin | User Management',
        component: ListUserComponent,
      },
      {
        path: 'feedback-management',
        title: 'Admin | Feedback Management',
        component: ListFeedbackComponent,
      },
      {
        path: 'book-management',
        title: 'Admin | Book Management',
        component: ListBookComponent,
      },
      {
        path: 'flavor-management',
        title: 'Admin | Flavor Management',
        component: ListFlavorComponent,
      },
      {
        path: 'product-management',
        title: 'Admin | Product Management',
        component: ListProductComponent,
      },
      {
        path: 'faq-management',
        title: 'Admin | FAQs Management',
        component: ListFaqComponent,
      },
      {
        path: 'order-management',
        title: 'Admin | Order Management',
        component: ListOrderComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
