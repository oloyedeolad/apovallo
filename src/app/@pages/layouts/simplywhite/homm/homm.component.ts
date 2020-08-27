import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-index1',
  templateUrl: './homm.component.html',
  styleUrls: ['./homm.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .dark-modal .modal-content {
    background-color: #000000;
    color: white;
    background: none;
    border: none;
  }
  .dark-modal .modal-header {
    border : none
  }
  .dark-modal .close {
    color: white;
  }
`]
})
export class HommComponent implements OnInit {

  currentSection = 'home';

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }
  constructor() { }

  ngOnInit() {
  }

  /**
   * Open modal for show the video
   * @param content content of modal
   */
  /*openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg' });
  }*/
}
