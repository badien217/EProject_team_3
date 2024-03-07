import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faMinus, faPlus, faAngleDown, faAngleUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/interfaces/recipe';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('open', style({
        opacity: 1,
        height: '*',
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
      })),
      transition('open <=> closed', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class AddRecipeComponent {
  faMinus = faMinus;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  stepOpenStates: boolean[] = [];

  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    submittedBy: '',
    steps: [],
    ingredient: '',
    isShow: false,
  };

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: ['bold', 'italic', '|', 'NumberedList', 'BulletedList'],
    placeholder: 'Type the content here!'
  }


  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.recipe.steps.forEach(() => this.stepOpenStates.push(true));

  }

  createRecipe() {
    this.recipeService.createRecipe(this.recipe).subscribe(
      (response) => {
        // Recipe created successfully
        this.router.navigate(['/admin/recipe-management']);
        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          duration: 2000,
        });
      },
      (error) => {
        // Error handling - display error message
        console.error(error);
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          duration: 2000,
        });
      }
    );
  }


  addStep(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.recipe.steps.push({ id: 0, recipeId: 0, content: '', imageUrl: '' });
    this.stepOpenStates.push(true); // Open the newly added step by default
  }

  toggleStep(index: number): void {
    this.stepOpenStates[index] = !this.stepOpenStates[index];
  }

  removeStep(index: number): void {
    // Ensure that the index is valid
    if (index >= 0 && index < this.recipe.steps.length) {
      // Remove the step and its corresponding state
      this.recipe.steps.splice(index, 1);
      this.stepOpenStates.splice(index, 1);
    }
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
}
