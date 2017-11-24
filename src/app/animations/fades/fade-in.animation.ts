import {
  trigger,
  animate,
  transition,
  state,
  style,
  query
} from '@angular/animations';

const fadeEnterDuration = 20;
const fadeLeaveDuration = 20;

export const triggerName = 'fadeAnimation';
export const animation = trigger(triggerName, [
  state('init', style({ opacity: 0 })),
  state('hide', style({ opacity: 0 })),
  state('show', style({ opacity: 1 })),

  transition('show => hide', animate('600ms ease-out')),
  transition('hide => show', animate('1000ms ease-in')),
  transition('init => show', animate('1000ms ease-in')),
]);
