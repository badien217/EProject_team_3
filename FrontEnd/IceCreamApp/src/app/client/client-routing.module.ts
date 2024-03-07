import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ClientAuthGuard } from './client-auth.guard';
import { ProfileComponent } from './feature/user-info/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home - IceCream',
    },
    {
        path: 'menu',
        component: MenuComponent,
        title: 'Menu - IceCream',
    },
    {
        path: 'books',
        component: BookComponent,
        title: 'Book - IceCream',
    },
    {
        path: 'books/book-detail/:id',
        component: BookDetailsComponent,
        title: 'Book Details - IceCream',
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        title: 'About Us - IceCream',
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'Contact Us - IceCream',
    },
    {
        path: 'feedback',
        component: FeedbackComponent,
        title: 'Feedback - IceCream',
    },
    {
        path: 'order',
        component: OrderComponent,
        title: 'Order - IceCream',
    },
    {
        path: 'recipes',
        title: 'Recipe - IceCream',
        component: RecipeComponent,
    },
    {
        path: 'recipes/recipe-detail/:id',
        title: 'Recipe Details - IceCream',
        canActivate: [ClientAuthGuard],
        component: RecipeDetailsComponent,
    },
    {
        path: 'faq',
        title: 'FAQs - IceCream',
        component: FaqComponent,
    },
    {
        path: 'profile',
        title: 'Profile - IceCream',
        component: ProfileComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
