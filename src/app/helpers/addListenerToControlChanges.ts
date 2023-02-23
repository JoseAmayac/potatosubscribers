import { FormGroup } from "@angular/forms";
import { distinctUntilChanged } from "rxjs";

export function addListenerToControlChanges(formGroup: FormGroup, controlName: string, controlsToUpdate:string[]):void{
  formGroup.get(controlName)?.valueChanges
  .pipe(distinctUntilChanged())
  .subscribe(() => {
    updateControls(formGroup, controlsToUpdate)
  });
}
function updateControls(formGroup: FormGroup, controls: string[]): void{
  for (const control of controls) {
    const formControl = formGroup.get(control);
    formControl?.updateValueAndValidity();
  }
}
