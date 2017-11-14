import {
  Component,
  HostListener,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ReflectiveInjector,
  Type
} from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@Component({
  template: `
    <div #container class="modal" role="dialog">
        <div class="modal-background"></div>
        <div class="modal-content">
            <ng-template #element></ng-template>
        </div>
        <button class="modal-close is-large" (click)="closeDialog()"></button>
    </div>
`
})
export class DialogWrapperComponent {
  /**
     * Target element to insert dialog content component
     */
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  /**
     * Link container DOM element
     */
  @ViewChild('container') public container;

  /**
     * Dialog content componet
     * @type {DialogComponent}
     */
  private content: DialogComponent<any, any>;

  private handleEscapePressed: boolean;

  /**
     * Constructor
     * @param {ComponentFactoryResolver} resolver
     * @param {DialogService} dialogService
     */
  constructor(
    private resolver: ComponentFactoryResolver,
    private dialogService: DialogService
  ) {}

  /**
     * Adds content dialog component to wrapper
     * @param {Type<DialogComponent>} component
     * @return {DialogComponent}
     */
  addComponent<T, T1>(component: Type<DialogComponent<T, T1>>) {
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = ReflectiveInjector.fromResolvedProviders(
      [],
      this.element.injector
    );
    const componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content = <DialogComponent<T, T1>>componentRef.instance;
    this.content.wrapper = this;
    return this.content;
  }

  /**
     * Registers event handler to close dialog by click on backdrop
     */
  closeByClickOutside() {
    const containerEl = this.container.nativeElement;
    containerEl
      .querySelector('.modal-background')
      .addEventListener('click', event => {
        this.dialogService.removeDialog(this.content);
        event.stopPropagation();
      });
  }

  closeByEscapeKeyPressed() {
    this.handleEscapePressed = true;
  }

  closeDialog() {
    this.dialogService.removeDialog(this.content);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (!this.handleEscapePressed) {
      return;
    }
    if (e.keyCode === 27) {
      this.dialogService.removeDialog(this.content);
    }
  }
}
