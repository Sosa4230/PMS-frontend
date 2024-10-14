import { AbstractControl, ValidationErrors } from "@angular/forms"

export class PriceValidation {

    static price(object : AbstractControl<number>) : ValidationErrors | null {

        if(object.value !== undefined && object.value > 0 && object.value < 100000) {
            return null
        } else {
            return {'price' : true}
        }
        
    }

}