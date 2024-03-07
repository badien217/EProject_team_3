import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { AboutUsComponent } from './feature/about-us/about-us.component';
import { BookComponent } from './feature/book/book.component';
import { BookDetailsComponent } from './feature/book-details/book-details.component';
import { ContactUsComponent } from './feature/contact-us/contact-us.component';
import { FaqComponent } from './feature/faq/faq.component';
import { FeedbackComponent } from './feature/feedback/feedback.component';
import { HomeComponent } from './feature/home/home.component';
import { MenuComponent } from './feature/menu/menu.component';
import { OrderComponent } from './feature/order/order.component';
import { RecipeComponent } from './feature/recipe/recipe.component';
import { RecipeDetailsComponent } from './feature/recipe-details/recipe-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateUserComponent } from './feature/user-info/update-user/update-user.component';
import { UpdateAvatarComponent } from './feature/user-info/update-avatar/update-avatar.component';
import { ProfileComponent } from './feature/user-info/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    BookComponent,
    BookDetailsComponent,
    ContactUsComponent,
    FaqComponent,
    FeedbackComponent,
    HomeComponent,
    MenuComponent,
    OrderComponent,
    RecipeComponent,
    RecipeDetailsComponent,
    ProfileComponent,
    UpdateUserComponent,
    UpdateAvatarComponent
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
    CKEditorModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
