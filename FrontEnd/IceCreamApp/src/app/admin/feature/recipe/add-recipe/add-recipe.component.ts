import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faMinus, faPlus, faAngleDown, faAngleUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { StepService } from 'src/app/services/step.service';

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
  isCreating = false;
  stepOpenStates: boolean[] = [];
  recipeForm: FormGroup;
  steps: FormGroup[] = [];
  selectedStepImages: string[] = [];
  selectedRecipeImage: string = '';

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: ['bold', 'italic', '|', 'NumberedList', 'BulletedList'],
    placeholder: 'Type the content here!'
  }


  constructor(
    private recipeService: RecipeService,
    private stepService: StepService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      submittedBy: ['Our Ice Cream Parlor'],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      ingredient: [''],
      isShow: false,
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


  createRecipe() {
    const formData = { ...this.recipeForm.value };
    this.isCreating = true;

    this.recipeService.createRecipe(formData).subscribe(
      (result) => {
        // For each step, create it with the recipe ID
        this.steps.forEach((step, index) => {
          this.createStep(result.id, step, index);
        });

        this.router.navigate(['/admin/recipe-management']);
        this.messageService.openSuccess('Create recipe successfully');
      },
      (error) => {
        this.messageService.openError('Fail to create recipe. Please try again');
      }
    )
  }

  createStep(recipeId: number, step: FormGroup, index: number) {
    const formData = { ...step.value };
    formData.recipeId = recipeId;

    this.stepService.createStep(formData).subscribe(
      (result) => {

      },
      (error) => {
        this.messageService.openError('Fail to create instruction step')
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
