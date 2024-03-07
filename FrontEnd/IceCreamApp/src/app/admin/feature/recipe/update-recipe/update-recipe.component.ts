import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faMinus, faPlus, faAngleDown, faAngleUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from 'src/app/services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from 'src/app/interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StepService } from 'src/app/services/step.service';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
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
export class UpdateRecipeComponent {
  faMinus = faMinus;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  stepOpenStates: boolean[] = [];

  recipeId?: number;
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
  }


  constructor(
    private recipeService: RecipeService,
    // private stepService: StepService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.recipe.steps.forEach(() => this.stepOpenStates.push(true));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      this.getRecipeDetails();
    });
  }

  getRecipeDetails(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe(
      (data) => {
        this.recipe = data;
      },
      (error) => {
        console.error('Error fetching recipe details:', error);
      }
    );
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe(
      () => {
        console.log('Recipe updated successfully!', this.recipe); // Log the updated recipe data

        // this.updateSteps();
        this.router.navigate(['/admin/recipe-management']);
        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Recipe updated successfully!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      (error) => {
        console.error('Error updating recipe:', error);

        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Failed to update recipe. Please try again later' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  // updateSteps(): void {
  //   // Assuming you have a service method to update steps individually in the backend
  //   for (const step of this.recipe.steps) {
  //     this.stepService.updateStep(step.id, step).subscribe(
  //       () => {
  //         // Individual step updated successfully
  //         // You can handle additional logic if needed
  //       },
  //       (error) => {
  //         console.error(`Error updating step with ID ${step.id}:`, error);

  //         this.snackBar.openFromComponent(ErrorSnackbarComponent, {
  //           data: { message: 'Failed to update step. Please try again later.' }, 
  //           panelClass: ['custom-snackbar'],
  //           duration: 3000,
  //           horizontalPosition: 'end',
  //           verticalPosition: 'top'
  //         });
  //       }
  //     );
  //   }

  //   // After all steps are updated, navigate and show success message
  //   this.router.navigate(['/admin/recipe-management']);
  //   this.snackBar.openFromComponent(SuccessSnackbarComponent, {
  //     data: { message: 'Recipe and steps updated successfully!' }, 
  //     panelClass: ['custom-snackbar'],
  //     duration: 3000,
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top'
  //   });
  // }


  addStep(event: Event): void {
    event.preventDefault(); // Prevent form submission

    // Ensure that recipe.steps is defined before pushing a new step
    if (this.recipe.steps) {
      this.recipe.steps.push({ id: 0, recipeId: 0, content: '', imageUrl: '' });
    } else {
      // If recipe.steps is undefined, initialize it as an empty array
      this.recipe.steps = [{ id: 0, recipeId: 0, content: '', imageUrl: '' }];
    }

    this.stepOpenStates.push(true); // Open the newly added step by default
  }

  removeStep(index: number): void {
    // Ensure that the index is valid
    if (index >= 0 && index < this.recipe.steps.length) {
      // Remove the step and its corresponding state
      this.recipe.steps.splice(index, 1);
      this.stepOpenStates.splice(index, 1);
    }
  }

  toggleStep(index: number): void {
    this.stepOpenStates[index] = !this.stepOpenStates[index];
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
}
