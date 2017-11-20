import {
  Component,
  HostListener,
  Input,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ReflectiveInjector,
  Type
} from '@angular/core';
import {
  trigger,
  animate,
  transition,
  state,
  style,
  query
} from '@angular/animations';

import { fadeIn } from '../../animations/animations';

import { IModalComponent, IModalWrapperComponent } from './modal.domain';

@Component({
  animations: [
    trigger('fadeAnimation', [
      state('init', style({ opacity: 0 })),
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),

      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ],
  template: `
          <div #container class="modal-content" [@fadeAnimation]="stateName" *ngIf="!isCollapsed">
              <ng-template #element></ng-template>
          </div>
  `
})
export class ModalWrapperComponent implements IModalWrapperComponent {
  private _isVisible = false;
  get isVisible(): boolean {
    return this._isVisible;
  }
  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  private _isCollapsed: boolean;
  get isCollapsed(): boolean {
    return this._isCollapsed;
  }
  set isCollapsed(isCollapsed: boolean) {
    this._isCollapsed = isCollapsed;
  }

  private isInit = false;

  get stateName(): string {
    return this.isVisible ? 'show' : 'hide';
  }

  @ViewChild('container') public container;
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  @Input() public closeHandler: (wrapper: IModalComponent<any, any>) => void;

  /**
       * Adds content dialog component to wrapper
       * @param {Type<DialogComponent>} component
       * @return {DialogComponent}
       */
  loadComponent<T, T1>(componentType: Type<IModalComponent<T, T1>>) {
    const factory = this.resolver.resolveComponentFactory(componentType);
    const injector = ReflectiveInjector.fromResolvedProviders(
      [],
      this.element.injector
    );
    const componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.isVisible = true;
    const component = componentRef.instance;
    component.wrapper = this;
    return component;
  }
}
