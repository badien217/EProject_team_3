import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/admin/core/interfaces/user';
import { UserService } from 'src/app/admin/core/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  faTrash = faTrash;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['index', 'name', 'username', 'email', 'phone', 'subscriptionType', 'paymentStatus', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.messageService.openError('Users data retrieval error')
    });
  }

  getIndex(row: User): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this product? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.userService.deleteUser(userId).subscribe(() => {
          this.retrieveUsers();

          this.messageService.openSuccess('User deleted successfully');
        }, (error) => {
          this.messageService.openError('Failed to delete user. Please try again later');
        });
      }
    });
  }

  getSubscriptionClass(subscriptionType: string): string {
    if (subscriptionType === 'monthly') {
      return 'monthly-subscription'; // Define 'monthly-subscription' class in your CSS
    } else if (subscriptionType === 'yearly') {
      return 'yearly-subscription'; // Define 'yearly-subscription' class in your CSS
    } else {
      return ''; // Default class or handle other cases
    }
  }

}
