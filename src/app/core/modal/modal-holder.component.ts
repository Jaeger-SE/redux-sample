import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { chain } from 'lodash';
import { Observable } from 'rxjs/Observable';

import {
  ModalOptions,
  IModalComponent,
  IModalHolderComponent,
  IModalWrapperComponent
} from './modal.domain';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

const fadeInDuration = 300;
const fadeOutDuration = 300;

interface ModalRegistration extends ModalOptions {
  component: IModalComponent<any, any>;
}

@Component({
  animations: [
    trigger('popover', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),

      transition('show => hide', animate(fadeOutDuration + 'ms ease-out')),
      transition('hide => show', animate(fadeInDuration + 'ms ease-in'))
    ])
  ],
  template: `
            <div #container class="modal" role="dialog" [@popover]="stateName">
              <div class="modal-background"></div>
              <ng-template #element></ng-template>
              <button class="modal-close is-large" (click)="closeDialog()"></button>
            </div>
            `,
  styleUrls: ['./modal.scss']
})
export class ModalHolderComponent implements IModalHolderComponent, OnInit {
  @ViewChild('container') public container: ElementRef;
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  get stateName(): string {
    return this._isVisible ? 'show' : 'hide';
  }

  private _modalComponents: IModalComponent<any, any>[];
  private _isVisible: boolean;
  private _isInit: boolean;
  private _registeredComponentsStack: ModalRegistration[];

  constructor(private resolver: ComponentFactoryResolver) {
    this._modalComponents = [];
    this._registeredComponentsStack = [];
    this._isVisible = false;
    this._isInit = false;
  }

  private getOptionsExtended(options: ModalOptions): ModalRegistration {
    return Object.assign(<ModalRegistration>{}, options || <ModalOptions>{});
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._isVisible = true;
      this._isInit = true;
    }, 30);
  }

  addDialog<TIn, TResult>(
    component: Type<IModalComponent<TIn, TResult>>,
    data?: TIn,
    options?: ModalOptions
  ): Observable<TResult> {
    const optionExtended = this.getOptionsExtended(options);
    const factory = this.resolver.resolveComponentFactory(
      ModalWrapperComponent
    );
    const componentRef = this.element.createComponent(factory);
    const modalWrapper: ModalWrapperComponent = componentRef.instance;
    const _component: IModalComponent<any, any> = modalWrapper.loadComponent<
      TIn,
      TResult
    >(component);
    if (typeof optionExtended.index !== 'undefined') {
      this._modalComponents.splice(options.index, 0, _component);
    } else {
      this._modalComponents.push(_component);
    }
    optionExtended.component = _component;
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
      this._registeredComponentsStack.push(optionExtended);
    }
    if (options.backdropColor) {
      this.container.nativeElement.style.backgroundColor =
        options.backdropColor;
    }
    _component.closeHandler = this.removeDialog.bind(this);

    if (this._isInit) {
      this._isVisible = true;
    }
    setTimeout(() => {
      this.activateComponent(_component);
    }, fadeInDuration);
    return _component.fillData(data);
  }

  closeDialog() {
    this.removeDialog(chain(this._modalComponents).last());
  }

  removeDialog(component: IModalComponent<any, any>) {
    const shouldHideHolder = this._modalComponents.length <= 1;
    const nextComponent = chain(this._modalComponents)
      .filter(x => x !== component)
      .last<IModalComponent<any, any>>();
    this.activateComponent(nextComponent);
    component.wrapper.isVisible = false;
    if (shouldHideHolder) {
      setTimeout(() => {
        this._isVisible = false;
      }, 0);
    }

    setTimeout(() => {
      if (shouldHideHolder) {
        const element = this.container.nativeElement;
        element.classList.remove('is-active');
        element.classList.remove('in');
      }
      this._removeElement(component);
    }, fadeOutDuration);
  }

  private activateComponent(component: IModalComponent<any, any>): void {
    for (let i = 0; i < this._modalComponents.length; i++) {
      const componentBrowsed = this._modalComponents[i];
      componentBrowsed.wrapper.isCollapsed =
        component !== undefined && componentBrowsed !== component;
    }
  }

  private _removeElement(component) {
    const index = this._modalComponents.indexOf(component);
    if (index >= 0) {
      this.element.remove(index);
      this._modalComponents.splice(index, 1);
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (e.keyCode !== 27) {
      return;
    }
    if (this._modalComponents.length <= 0) {
      return;
    }
    const modalComp = this._modalComponents[this._modalComponents.length - 1];
    this.removeDialog(modalComp);
  }

  /**
   * Registers event handler to close dialog by click on backdrop
   */
  private closeByClickOutside() {
    const containerEl = this.container.nativeElement;
    containerEl
      .querySelector('.modal-background')
      .addEventListener('click', event => {
        if (this._modalComponents.length <= 0) {
          return;
        }
        this.removeDialog(
          this._modalComponents[this._modalComponents.length - 1]
        );
        event.stopPropagation();
      });
  }
}
