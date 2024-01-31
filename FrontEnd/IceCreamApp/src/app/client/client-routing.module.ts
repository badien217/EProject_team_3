import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { OrderComponent } from './feature/order/order.component';
import { RecipeDetailsComponent } from './feature/recipe-details/recipe-details.component';
import { FaqComponent } from './feature/faq/faq.component';
import { FeedbackComponent } from './feature/feedback/feedback.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { AboutUsComponent } from './feature/about-us/about-us.component';
import { BookDetailsComponent } from './feature/book-details/book-details.component';
import { MenuComponent } from './feature/menu/menu.component';
import { HomeComponent } from './feature/home/home.component';
import { BookComponent } from './feature/book/book.component';
import { RecipeComponent } from './feature/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
},
{
    path: 'home',
    component: HomeComponent,
    title: 'Home',
},
{
    path: 'menu',
    component: MenuComponent,
    title: 'Menu',
},
{
    path: 'books',
    component: BookComponent,
    title: 'Book',
},
{
    path: 'books/book-detail/:id',
    component: BookDetailsComponent,
},
{
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us',
},
{
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us',
},
{
    path: 'feedback',
    component: FeedbackComponent,
    title: 'Feedback',
},
{
    path: 'order',
    component: OrderComponent,
    title: 'Order',
},
{
    path: 'recipes',
    component: RecipeComponent,
    title: 'Recipe',
},
{
    path: 'recipes/recipe-detail/:id',
    component: RecipeDetailsComponent,
},
{
    path: 'faq',
    component: FaqComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
