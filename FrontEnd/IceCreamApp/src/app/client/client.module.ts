import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HomeComponent } from './feature/home/home.component';
import { AboutUsComponent } from './feature/about-us/about-us.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { MenuComponent } from './feature/menu/menu.component';
import { RecipeComponent } from './feature/recipe/recipe.component';
import { BookComponent } from './feature/book/book.component';
import { BookDetailsComponent } from './feature/book-details/book-details.component';
import { RecipeDetailsComponent } from './feature/recipe-details/recipe-details.component';
import { FeedbackComponent } from './feature/feedback/feedback.component';
import { FaqComponent } from './feature/faq/faq.component';
import { OrderComponent } from './feature/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    MenuComponent,
    RecipeComponent,
    BookComponent,
    BookDetailsComponent,
    RecipeDetailsComponent,
    FeedbackComponent,
    FaqComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule, 
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
