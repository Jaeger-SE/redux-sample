import { Input } from '@angular/core';

import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { IModalComponent, IModalWrapperComponent } from './modal.domain';

/**
 * Abstract dialog
 * @template TIn - dialog data;
 * @template TOut - dialog result
 */
export class ModalComponent<TIn, TOut>
  implements OnDestroy, IModalComponent<TIn, TOut> {
  /**
   * Observer to return result from dialog
   */
  private observer: Observer<TOut>;

  /**
   * Dialog wrapper (modal placeholder)
   */
  wrapper: IModalWrapperComponent;

  /**
   * Dialog result
   * @type {TOut}
   */
  protected result: TOut;

  @Input() public closeHandler: (wrapper: IModalComponent<TIn, TOut>) => void;

  /**
   * Constructor
   */
  constructor() {}

  /**
   *
   * @param {Tin} data
   * @return {Observable<TOut>}
   */
  fillData(data: TIn): Observable<TOut> {
    data = data || <TIn>{};
    const keys = Object.keys(data);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      this[key] = data[key];
    }
    return Observable.create(observer => {
      this.observer = observer;
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
    if (this.observer) {
      this.observer.next(this.result);
    }
  }
}
