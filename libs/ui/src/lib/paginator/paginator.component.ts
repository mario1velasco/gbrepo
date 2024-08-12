import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
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
  // * Injectors
  private cd = inject(ChangeDetectorRef);

  // * Inputs & Outputs
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  total = input.required<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  // * Variables
  pageSizeOptions = ['10', '20', '50'];

  // *************
  // * GETTERS
  // *************
  get from() {
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  get to() {
    return Math.min(this.currentPage() * this.pageSize(), this.total());
  }

  get totalPages() {
    return Math.ceil(this.total() / this.pageSize());
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
    if (this.currentPage() < this.totalPages) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onLastPage() {
    this.pageChange.emit(this.totalPages);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSizeChange.emit(parseInt(newPageSize, 10));
  }
}
