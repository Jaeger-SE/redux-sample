import {
  Component,
  ComponentFactoryResolver,
  Input,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef,
  OnInit
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
      state('hide', style({ left: '0', transform: 'translate(-100%, -50%)' })),
      state('show', style({ left: '50%', transform: 'translate(-50%, -50%)' })),
      // state('hide', style({ left: '100%', transform: 'translate(0, -50%)' })),

      transition('show => hide', animate(fadeOutDuration + 'ms ease-out')),
      transition('hide => show', animate(fadeInDuration + 'ms ease-in'))
    ]),
    trigger('hideAnimation', [
      state('true', style({ display: 'none' })),
      state('false', style({ display: 'block' }))
    ])
  ],
  template: `
          <div #container class="modal-content" [@fadeAnimation]="stateName" [@hideAnimation]="isCollapsed">
              <ng-template #element></ng-template>
          </div>
  `
})
export class ModalWrapperComponent implements IModalWrapperComponent, OnInit {
  @ViewChild('container') public container: ViewContainerRef;
  @ViewChild('element', { read: ViewContainerRef })
  public element: ViewContainerRef;

  @Input() public closeHandler: (wrapper: IModalComponent<any, any>) => void;

  private _isInit: boolean;

  private _isVisible: boolean;
  public get isVisible(): boolean {
    return this._isVisible;
  }
  public set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  private _isCollapsed: boolean;
  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }
  public set isCollapsed(isCollapsed: boolean) {
    this._isCollapsed = isCollapsed;
  }

  public get stateName(): string {
    return this._isVisible ? 'show' : 'hide';
  }

  constructor(private resolver: ComponentFactoryResolver) {
    this._isCollapsed = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._isVisible = true;
      this._isInit = true;
    }, 30);
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
