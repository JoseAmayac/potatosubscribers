import { FormGroup } from "@angular/forms";
import { distinctUntilChanged } from "rxjs";

/**
 * Agrega un subscribe a el control dentro del formgroup pasado, cada vez que el form control se actualice
 * los demás campos serán actualizados en cuanto a sus validaciones
 */
export function addListenerToControlChanges(formGroup: FormGroup, controlName: string, controlsToUpdate:string[]):void{
  formGroup.get(controlName)?.valueChanges
  .pipe(distinctUntilChanged())
  .subscribe(() => {
    updateControls(formGroup, controlsToUpdate)
  });
}

/**
 * Permite actualizar las validaciones y valores de los campos pasados en el arreglo y que están dentro del formGroup
 */
function updateControls(formGroup: FormGroup, controls: string[]): void{
  for (const control of controls) {
    const formControl = formGroup.get(control);
    formControl?.updateValueAndValidity();
  }
}
