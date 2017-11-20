import {
  Component,
  ComponentFactoryResolver,
  Input,
  ReflectiveInjector,
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

import { IModalComponent, IModalWrapperComponent } from './modal.domain';

const fadeInDuration = 300;
const fadeOutDuration = 300;

@Component({
  animations: [
    trigger('fadeAnimation', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),

      transition('show => hide', animate(fadeOutDuration + 'ms ease-out')),
      transition('hide => show', animate(fadeInDuration + 'ms ease-in'))
    ])
  ],
  template: `
          <div #container class="modal-content" [@fadeAnimation]="stateName" [hidden]="isCollapsed">
              <ng-template #element></ng-template>
          </div>
  `
})
export class ModalWrapperComponent implements IModalWrapperComponent {
  @ViewChild('container') public container: ViewContainerRef;
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  @Input() public closeHandler: (wrapper: IModalComponent<any, any>) => void;

  private _isCollapsed: boolean;
  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }
  public set isCollapsed(isCollapsed: boolean) {
    this._isCollapsed = isCollapsed;
  }

  constructor(private resolver: ComponentFactoryResolver) {
    this._isCollapsed = false;
  }

  loadComponent<TIn, TResult>(
    componentType: Type<IModalComponent<TIn, TResult>>
  ): IModalComponent<TIn, TResult> {
    const factory = this.resolver.resolveComponentFactory(componentType);
    const injector = ReflectiveInjector.fromResolvedProviders(
      [],
      this.element.injector
    );
    const componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    const component = componentRef.instance;
    component.wrapper = this;
    return component;
  }
}
