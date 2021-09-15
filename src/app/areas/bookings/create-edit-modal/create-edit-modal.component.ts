import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/core/singleton-services/movies/movie';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent implements OnInit {

  @Input() action: String;
  @ViewChild('content') content: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  private selectedMovie: Movie | undefined;

  constructor(private modalService: NgbModal) {
    this.action = "Create";
   }

  open() {
    this.modalService.open(this.content).result.then((result) => {
      if(result === "Save")
        this.handleSave();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }

  handleMovieSelected(selectedMovie: Movie) {
    this.selectedMovie = selectedMovie;
  }

  handleSave() {
    this.onSave.emit(this.selectedMovie);
  }
}
