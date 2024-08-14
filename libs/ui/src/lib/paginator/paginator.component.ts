import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'ui-paginator',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  // * Inputs & Outputs
  /** Current page number  */
  currentPage = input.required<number>();
  /** Number of items per page  */
  pageSize = input.required<number>();
  /** Total number of items  */
  total = input.required<number>();
  /** Total number of pages  */
  totalPages = input.required<number>();
  /** Event emitted when the current page changes */
  @Output() pageChange = new EventEmitter<number>();
  /** Event emitted when the number of items per page changes */
  @Output() pageSizeChange = new EventEmitter<number>();

  // * Variables
  pageSizeOptions = ['10', '20', '30'];

  // *************
  // * GETTERS
  // *************
  get from() {
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  get to() {
    return Math.min(this.currentPage() * this.pageSize(), this.total());
  }

  // *************
  // * EVENTS
  // *************

  onFirstPage() {
    this.pageChange.emit(1);
  }

  onPreviousPage() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onLastPage() {
    this.pageChange.emit(this.totalPages() - 1);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSizeChange.emit(parseInt(newPageSize, 10));
  }
}
