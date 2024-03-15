import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Recipe> = new MatTableDataSource<Recipe>();
  displayedColumns: string[] = ['index', 'name', 'submittedBy', 'image', 'description', 'isShow', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  selectedStatus: boolean = false;

  constructor(private recipeService: RecipeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveRecipes();
  }

  retrieveRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Recipe>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource);
        // Initialize selectedStatus for each recipe
        this.dataSource.data.forEach(recipe => {
          this.selectedStatus = recipe.isShow; // Assuming isShow is the property representing the status
        });
      },
      error: (e) => console.error(e),
    });
  }

  updateStatus(recipeId: number, newStatus: boolean): void {
    const updateStatusData = {
      id: recipeId,
      isShow: newStatus
    }
    this.recipeService.updateRecipeStatus(recipeId, updateStatusData).subscribe(() => {
      this.snackBar.openFromComponent(SuccessSnackbarComponent, {
        data: { message: 'Recipe status updated successfully!' },
        panelClass: ['custom-snackbar'],
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }, (error) => {
      console.log(recipeId, newStatus)
      console.error('Error while updating recipe status:', error);
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: { message: 'Failed to update recipe status. Please try again later' },
        panelClass: ['custom-snackbar'],
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    });
  }


  getIndex(row: Recipe): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  deleteRecipe(recipeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this recipe? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.recipeService.deleteRecipe(recipeId).subscribe(() => {
          this.retrieveRecipes();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Recipe deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });

        }, (error) => {
          // Log the error here
          console.error('Error while deleting recipe:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete recipe. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });
      }
    });
  }
}
