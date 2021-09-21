import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator{
    static EmailValidator(control: AbstractControl): ValidationErrors | null {
        const emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        const data = control.value as string;
        if(!data){
            return null;
        }
        if(emailRegx.test(data) === false){
            return {emailNotMatch:`Email must be in proper format`}
        }
        return null;
    }

    static PasswordStrengthValidator(control: AbstractControl): ValidationErrors | null {
        const data = control.value as string;
        if(!data){
            return null;
        }
        const upperCaseChar = /[A-Z]+/g;
        const lowerCaseChar = /[a-z]+/g;
        const numberChar = /[0-9]+/g;
        if(data.length < 8 || upperCaseChar.test(data) === false || lowerCaseChar.test(data) === false || numberChar.test(data) === false ){
            return {PasswordStrength:`Password should be alphanumberic with minimum 8 characters including both upper and lower case characters.`}
        }
        return null;
    }

    static PhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
        const data = control.value as string;
        if(!data){
            return null;
        }
        const phoneNumberRegex = /^[6-9]\d{9}$/g;
        if(!Number.isInteger(data) || data.length < 10 || !phoneNumberRegex.test(data)){
            return {PhoneNumberNotMatch: `Phone number must be in proper format.`}
        }
        return null;
    }
}