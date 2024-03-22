import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faMinus, faPlus, faAngleDown, faAngleUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { StepService } from 'src/app/services/step.service';

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
  isUpdating = false;
  stepOpenStates: boolean[] = [];
  recipeId: number = 0;
  recipeForm: FormGroup;
  steps: FormGroup[] = [];
  selectedStepImages: string[] = [];
  selectedRecipeImage: string = '';

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: ['bold', 'italic', '|', 'NumberedList', 'BulletedList'],
  }


  constructor(
    private recipeService: RecipeService,
    private stepService: StepService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      submittedBy: ['Our Ice Cream Parlor'],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      ingredient: [''],
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      this.getRecipeDetails();
    });
  }

  getRecipeDetails(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe(
      (data) => {
        // Populate recipe details
        this.recipeForm.patchValue({
          name: data.name,
          imageUrl: data.imageUrl,
          description: data.description,
          ingredient: data.ingredient,
        });

        // Clear existing steps and their corresponding selected images
        this.steps = [];
        this.selectedStepImages = [];

        // Populate steps
        data.steps.forEach((stepData: any) => {
          const stepGroup = this.fb.group({
            content: [stepData.content, Validators.required],
            imageUrl: [stepData.imageUrl, Validators.required]
          });
          this.steps.push(stepGroup);
          this.selectedStepImages.push(stepData.imageUrl); // Assuming imageUrl is fetched for each step
        });

        // Initialize the state of each step to open
        this.stepOpenStates = new Array(data.steps.length).fill(true);
      },
      (error) => {
        this.messageService.openError('Recipe detail data retrieval error')
      }
    );
  }

  // Method to delete all steps for the current recipe
  deleteAllSteps() {
    if (this.recipeId) {
      this.stepService.getStepsByRecipeId(this.recipeId).subscribe(
        (steps) => {
          steps.forEach((step) => {
            this.stepService.deleteStep(step.id).subscribe(
              () => {

              },
              (error) => {
                this.messageService.openError('Something went wrong')
              }
            );
          });
        },
        (error) => {
          this.messageService.openError('Steps data retrieval error')
        }
      );
    } else {
      this.messageService.openError('Data for this recipe is undefined')
    }
  }

  updateRecipe(): void {
    const formData = { ...this.recipeForm.value };
    this.isUpdating = true;

    this.recipeService.updateRecipe(this.recipeId, formData).subscribe(
      (result) => {

        this.deleteAllSteps();

        // For each step, create it with the recipe ID
        this.steps.forEach((step, index) => {
          this.createStep(step, index);
        });

        // Recipe created successfully
        this.router.navigate(['/admin/recipe-management']);
        this.messageService.openSuccess('Recipe updated successfully');
      },
      (error) => {
        this.messageService.openError('Fail to update recipe. Please try again');
      }
    );
  }

  createStep(step: FormGroup, index: number) {
    const formData = { ...step.value };
    formData.recipeId = this.recipeId;

    this.stepService.createStep(formData).subscribe(
      (result) => {

      },
      (error) => {
        console.log(error);
      }
    )
  }


  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
}
