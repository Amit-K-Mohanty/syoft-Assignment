
export function getValidatonOnForm(formControl: any, fieldName: any, isSubmitted: boolean) {
    if (formControl?.controls[fieldName].status === 'INVALID' && (formControl?.controls[fieldName].touched || isSubmitted)) {
        return true
    }
    return false


}
export function maxNumToBeAllowed(event: any, maxLen: number) {
    if (event.target.value.length >= maxLen) {
        return false;
    }
    return true;
}
export const EMAIL_PATTERN = /^(([^<>!#$%&\^\*()\[\]\\.,;:\s@'"?`~]+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;