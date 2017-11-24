import { Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IModalComponent, IModalWrapperComponent } from './modal.domain';

export class ModalBaseComponent<TIn, TResult>
  implements IModalComponent<TIn, TResult>, OnDestroy {
  /**
   * Observer to return result from dialog
   */
  private _observer: Observer<TResult>;

  private _wrapper: IModalWrapperComponent;
  get wrapper(): IModalWrapperComponent {
    return this._wrapper;
  }
  set wrapper(wrapper: IModalWrapperComponent) {
    this._wrapper = wrapper;
  }

  constructor() {}

  /**
   * Dialog result
   * @type {TResult}
   */
  protected result: TResult;

  @Input() closeHandler: (wrapper: IModalComponent<TIn, TResult>) => void;

  /**
   * @param {TIn} data
   * @return {Observable<TResult>}
   */
  fillData(data: TIn): Observable<TResult> {
    data = data || <TIn>{};
    const keys = Object.keys(data);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      this[key] = data[key];
    }
    return Observable.create(observer => {
      this._observer = observer;
      return () => {
        this.close();
      };
    });
  }

  /**
   * Closes dialog
   */
  close(): void {
    this.closeHandler(this);
  }

  /**
   * OnDestroy handler
   * Sends dialog result to observer
   */
  ngOnDestroy(): void {
    if (this._observer) {
      this._observer.next(this.result);
    }
  }
}
