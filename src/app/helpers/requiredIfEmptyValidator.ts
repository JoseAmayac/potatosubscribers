import { AbstractControl } from "@angular/forms";

export const requiredIfEmptyValidator = (dependentFieldName: string, requiredFieldName: string) => {
  return function (control: AbstractControl): { [s: string]: boolean } | null {
    const dependentFieldValue = control.parent?.get(dependentFieldName)?.value;
    const requiredFieldValue = control.parent?.get(requiredFieldName)?.value;
    if (!dependentFieldValue && !requiredFieldValue) {
      return { requiredIfEmpty: true };
    }
    return null;
  };
}
