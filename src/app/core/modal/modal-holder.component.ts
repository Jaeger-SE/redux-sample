import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  trigger,
  animate,
  animateChild,
  transition,
  state,
  style,
  query
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';

import { fadeIn } from '../../animations/animations';

import { ModalComponent } from './modal.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { ModalOptions, IModalComponent } from './modal.domain';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  animations: [
    trigger('popover', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),

      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ],
  template: `
          <div #container class="modal" role="dialog" [@popover]="stateName">
            <div class="modal-background"></div>
            <ng-template #element></ng-template>
            <button class="modal-close is-large" (click)="closeDialog()"></button>
          </div>
          `
})
export class ModalHolderComponent implements OnInit {
  @ViewChild('container') public container;

  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  dialogs: Array<IModalComponent<any, any>> = [];

  private handleEscapePressedStack: boolean[] = [];

  /**
     * Constructor
     * @param {ComponentFactoryResolver} resolver
     */
  constructor(private resolver: ComponentFactoryResolver) {}

  public stateName: string;

  ngOnInit(): void {
    this.stateName = 'hide';
  }

  /**
     * Adds dialog
     * @param {Type<DialogComponent>} component
     * @param {object?} data
     * @param {DialogOptions?} options
     * @return {Observable<*>}
     */
  addDialog<TIn, TResult>(
    component: Type<IModalComponent<TIn, TResult>>,
    data?: TIn,
    options?: ModalOptions
  ): Observable<TResult> {
    this.stateName = 'show';
    options = options || <ModalOptions>{};
    const factory = this.resolver.resolveComponentFactory(
      ModalWrapperComponent
    );
    const componentRef = this.element.createComponent(factory);
    const modalWrapper = componentRef.instance;
    const _component: IModalComponent<any, any> = modalWrapper.loadComponent(
      component
    );
    if (typeof options.index !== 'undefined') {
      this.dialogs.splice(options.index, 0, _component);
    } else {
      this.dialogs.push(_component);
    }
    setTimeout(() => {
      this.container.nativeElement.classList.add('is-active');
      this.container.nativeElement.classList.add('in');
    });
    if (options.autoCloseTimeout) {
      setTimeout(() => {
        this.removeDialog(_component);
      }, options.autoCloseTimeout);
    }
    if (options.closeByClickingOutside) {
      this.closeByClickOutside();
    }
    if (options.closeByEscapeKeyPressed) {
      this.handleEscapePressedStack.push(true);
    }
    if (options.backdropColor) {
      this.container.nativeElement.style.backgroundColor =
        options.backdropColor;
    }
    _component.closeHandler = this.removeDialog.bind(this);
    return _component.fillData(data);
  }

  /**
     * Removes dialog
     * @param {IModalComponent} component
     */
  removeDialog(component: IModalComponent<any, any>) {
    if (this.dialogs.length <= 1) {
      const element = this.container.nativeElement;
      element.classList.remove('is-active');
      element.classList.remove('in');
    }
    component.wrapper.stateName = 'hide';
    setTimeout(() => {
      this._removeElement(component);
    }, 1000);
  }

  private _removeElement(component) {
    const index = this.dialogs.indexOf(component);
    if (index > -1) {
      this.element.remove(index);
      this.dialogs.splice(index, 1);
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (
      this.handleEscapePressedStack.length <= 0 ||
      !this.handleEscapePressedStack[0]
    ) {
      return;
    }
    if (this.dialogs.length <= 0) {
      return;
    }
    if (e.keyCode === 27) {
      this.removeDialog(this.dialogs[this.dialogs.length - 1]);
    }
  }

  /**
       * Registers event handler to close dialog by click on backdrop
       */
  closeByClickOutside() {
    const containerEl = this.container.nativeElement;
    containerEl
      .querySelector('.modal-background')
      .addEventListener('click', event => {
        if (this.dialogs.length <= 0) {
          return;
        }
        this.removeDialog(this.dialogs[this.dialogs.length - 1]);
        event.stopPropagation();
      });
  }

  clear() {
    this.element.clear();
    this.dialogs = [];
  }

  closeDialog() {
    this.removeDialog(this.dialogs[this.dialogs.length - 1]);
  }
}
