import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AboutUsComponent } from './feature/about-us/about-us.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { BookComponent } from './feature/book/book.component';
import { HomeComponent } from './feature/home/home.component';
import { MenuComponent } from './feature/menu/menu.component';
import { RecipeComponent } from './feature/recipe/recipe.component';
import { FaqComponent } from './feature/faq/faq.component';
import { FeedbackComponent } from './feature/feedback/feedback.component';
import { OrderComponent } from './feature/order/order.component';
import { BookDetailsComponent } from './feature/book-details/book-details.component';
import { RecipeDetailsComponent } from './feature/recipe-details/recipe-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    BookComponent,
    HomeComponent,
    MenuComponent,
    RecipeComponent,
    FaqComponent,
    FeedbackComponent,
    OrderComponent,
    BookDetailsComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
