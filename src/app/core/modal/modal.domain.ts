import { Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';

export interface ModalOptions {
  index?: number;
  autoCloseTimeout?: number;
  closeByClickingOutside?: boolean;
  closeByEscapeKeyPressed?: boolean;
  backdropColor?: string;
}

export interface IModalHolderComponent {
  addDialog<TIn, TResult>(
    component: Type<IModalComponent<TIn, TResult>>,
    data?: TIn,
    options?: ModalOptions
  ): Observable<TResult>;

  removeDialog(component: IModalComponent<any, any>): void;
}

export interface IModalWrapperComponent {
  isCollapsed: boolean;
  isVisible: boolean;
  loadComponent<TIn, TResult>(
    componentType: Type<IModalComponent<TIn, TResult>>
  ): IModalComponent<TIn, TResult>;
}

export interface IModalComponent<TIn, TOut> {
  /**
   * Dialog wrapper (modal placeholder)
   */
  wrapper: IModalWrapperComponent;

  closeHandler: (wrapper: IModalComponent<any, any>) => void;

  /**
   *
   * @param {Tin} data
   * @return {Observable<TOut>}
   */
  fillData(data: TIn): Observable<TOut>;
  close(): void;
}
