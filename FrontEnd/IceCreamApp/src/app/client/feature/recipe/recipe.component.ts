import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar, faStarHalfStroke, faArrowRight, faPlus, faAngleUp, faAngleDown, faTrash, faL } from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserRecipeService } from 'src/app/services/user-recipe.service';
import { UserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
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
export class RecipeComponent implements OnInit {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faArrowRight = faArrowRight;
  faPlus = faPlus;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faTrash = faTrash;
  recipeForm: FormGroup;
  steps: FormGroup[] = [];
  selectedStepImages: string[] = [];
  selectedRecipeImage: string = '';
  isCreating = false;

  userRecipe: UserRecipe = {
    id: 0,
    userId: 0,
    recipeId: 0,
    submissionDate: new Date(),
    isSelected: false,
  };

  showAllRecipes = true;
  showAddRecipeForm = false;
  activeButton: 'allRecipes' | 'addRecipe' = 'allRecipes';

  stepOpenStates: boolean[] = [];
  page: number = 1;

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: ['bold', 'italic', '|', 'NumberedList', 'BulletedList'],
    placeholder: 'Type the content here!'
  }

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private stepService: StepService,
    private userRecipeService: UserRecipeService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      submittedBy: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      ingredient: [''],
      isShow: [false]
    });

    // Initialize the first step
    this.addStep();

    // Set the state of the first step to open
    this.stepOpenStates.push(true);

    // Initialize the states of other steps to closed
    for (let i = 1; i < this.steps.length; i++) {
      this.stepOpenStates.push(false);
    }
  }

  ngOnInit() {
    this.recipeService.getAllShowRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    );
  }

  createRecipe() {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            const formData = { ...this.recipeForm.value };
            formData.submittedBy = data.userInfo.name;
            this.isCreating = true;

            this.recipeService.createRecipe(formData).subscribe(
              (response) => {
                if (response) {
                  this.userRecipe.userId = data.userInfo.id;
                  this.userRecipe.recipeId = response.id;

                  this.userRecipeService.createUserRecipe(this.userRecipe).subscribe(
                    (dataRecipe) => {
                      // For each step, create it with the recipe ID
                      this.steps.forEach((step, index) => {
                        this.createStep(dataRecipe.recipeId, step, index);
                      });

                      this.messageService.openSuccess('Create recipe successfully');
                      this.recipeForm = this.fb.group({
                        name: ['', Validators.required],
                        imageUrl: ['', Validators.required],
                        description: ['', Validators.required],
                        ingredient: [''],
                      });
                      this.isCreating = false;

                    },
                    (error) => {
                      this.messageService.openError('Fail to create recipe. Please try again');

                    }
                  );
                }
              },
              (error) => {
                this.messageService.openError('Fail to create recipe. Please try again');
              }
            );
          }
        );
      }
    }
  }


  createStep(recipeId: number, step: FormGroup, index: number) {
    const formData = { ...step.value };
    formData.recipeId = recipeId;

    this.stepService.createStep(formData).subscribe(
      (result) => {

      },
      (error) => {
        this.messageService.openError('Fail to add step. Please try again')
      }
    )
  }

  // Function to add a new step
  addStep() {
    // Create a new step FormGroup
    const stepGroup = this.fb.group({
      content: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
    // Push the new step FormGroup into the steps array
    this.steps.push(stepGroup);
    // Initialize the selected image array for the new step
    this.selectedStepImages.push('');
  }

  // Function to remove a step
  removeStep(index: number) {
    // Remove the step FormGroup at the specified index
    this.steps.splice(index, 1);
    // Remove the corresponding selected image
    this.selectedStepImages.splice(index, 1);
  }

  toggleStep(index: number) {
    this.stepOpenStates[index] = !this.stepOpenStates[index];
  }

  onFileRecipeSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedRecipeImage = e.target.result;
      };
      reader.readAsDataURL(file);

      this.recipeForm.patchValue({
        imageUrl: file,
      });
    }
  }

  // Function to handle step image selection
  onStepImageSelected(event: any, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedStepImages[index] = e.target.result;
      };
      reader.readAsDataURL(file);
      // Update the imageUrl form control value for the corresponding step
      this.steps[index].patchValue({
        imageUrl: file,
      });
    }
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
