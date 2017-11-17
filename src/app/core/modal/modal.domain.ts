import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface ModalOptions {
  index?: number;
  autoCloseTimeout?: number;
  closeByClickingOutside?: boolean;
  closeByEscapeKeyPressed?: boolean;
  backdropColor?: string;
}

export interface IModalWrapperComponent {
  /**
     * Link container DOM element
     */
  container;

  stateName: string;

  loadComponent<T, T1>(componentType: Type<IModalComponent<T, T1>>);
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
}
