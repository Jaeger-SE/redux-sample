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

      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ],
  template: `
          <div #container class="modal-content" [@fadeAnimation]="stateName">
              <ng-template #element></ng-template>
          </div>
  `
})
export class ModalWrapperComponent implements IModalWrapperComponent {
  public stateName: string;

  @ViewChild('container') public container;
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
    this.stateName = 'init';
  }

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
    this.stateName = 'show';
    const component = componentRef.instance;
    component.wrapper = this;
    return component;
  }
}
