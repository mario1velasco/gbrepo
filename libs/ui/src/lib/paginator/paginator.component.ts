import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = ['10', '20', '50'];

  get from() {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get to() {
    return Math.min(this.currentPage * this.pageSize, this.total);
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  firstPage() {
    this.pageChange.emit(1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  lastPage() {
    this.pageChange.emit(this.totalPages);
  }

  onPageSizeChange(newPageSize: string) {
    this.pageSizeChange.emit(parseInt(newPageSize, 10));
  }
}
