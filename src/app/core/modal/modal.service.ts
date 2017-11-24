import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  Optional,
  Type
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ModalHolderComponent } from './modal-holder.component';
import { IModalComponent, ModalOptions } from './modal.domain';

export class ModalServiceConfig {
  container: HTMLElement = null;
}

export class ModalService {
  /**
   * Placeholder of modal dialogs
   * @type {DialogHolderComponent}
   */
  private _modalHolderComponent: ModalHolderComponent;

  /**
   * HTML container for dialogs
   * type {HTMLElement}
   */
  private _modalContainerHtmlElement: HTMLElement;

  /**
 * Constructor
 */
  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Optional() config: ModalServiceConfig
  ) {
    this._modalContainerHtmlElement = config && config.container;
  }

  /**
   * Adds dialog
   * @param {Type<DialogComponent<TData, TResult>>} component
   * @param {TData?} data
   * @param {DialogOptions?} options
   * @return {Observable<TResult>}
   */
  addDialog<TData, TResult>(
    component: Type<IModalComponent<TData, TResult>>,
    data?: TData,
    options?: ModalOptions
  ): Observable<TResult> {
    if (!this._modalHolderComponent) {
      this._modalHolderComponent = this.createDialogHolder();
    }
    return this._modalHolderComponent.addDialog<TData, TResult>(
      component,
      data,
      options
    );
  }

  /**
   * Creates and add to DOM dialog holder component
   * @return {DialogHolderComponent}
   */
  private createDialogHolder(): ModalHolderComponent {
    const componentFactory = this.resolver.resolveComponentFactory(
      ModalHolderComponent
    );

    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    if (!this._modalContainerHtmlElement) {
      const componentRootViewContainer = this.applicationRef[
        '_rootComponents'
      ][0];
      this._modalContainerHtmlElement = (componentRootViewContainer.hostView as EmbeddedViewRef<
        any
      >).rootNodes[0] as HTMLElement;
    }
    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });
    this._modalContainerHtmlElement.appendChild(componentRootNode);

    return componentRef.instance;
  }
}
