import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[aadhaarNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberDirective),
      multi: true,
    },
  ],
})
export class NumberDirective {

  private onChange: any;
  private onTouched: any;
  private value: any;
  private clickBk: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string) {
    const filteredValue: string = filterValue(value);
    this.updateTextInput(filteredValue, this.value !== filteredValue);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.clickBk = true;
    } else {
      this.clickBk = false;
    }
  }

  private updateTextInput(value: string, propagateChange: boolean) {
    console.log(value.length + ' ' + propagateChange);

    if (!this.clickBk) {
      if (value.length === 4 || value.length === 9 || value.length === 14) {
        value = value + ' ';
      } else if (value.length === 20) {
        value = value.slice(0, -1);
      }
    }

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    if (propagateChange) {
      this.onChange(value);
    }
    this.value = value;
  }

  // ControlValueAccessor Interface
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  writeValue(value: any): void {
    value = value ? String(value) : '';
    this.updateTextInput(value, false);
  }
}

function filterValue(value: any): string {
  return value.replace(/[^0-9 ]| {2,}/g, '');
}
