import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class PesquisaForm extends FormGroup {

    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
    };

    /**
     *Creates an instance of PesquisaForm.
     * @memberof PesquisaForm
     */
    constructor() {
        super({
            protocolo: new FormControl(''),
            nomeEmpresarial: new FormControl(''),
            cnpj: new FormControl(''),
            numeroRegistro: new FormControl(''),
            atribuido: new FormControl('')
        });
    }

    /**
     * @readonly
     * @type {AbstractControl}
     * @memberof PesquisaForm
     */
    public get protocolo(): AbstractControl {
        return this.get('protocolo');
    }


    /**
     * @readonly
     * @type {AbstractControl}
     * @memberof PesquisaForm
     */
    public get nomeEmpresarial(): AbstractControl {
        return this.get('nomeEmpresarial');
    }

    /**
     * @readonly
     * @type {AbstractControl}
     * @memberof PesquisaForm
     */
    public get cnpj(): AbstractControl {
        return this.get('cnpj');
    }

    /**
     * @readonly
     * @type {AbstractControl}
     * @memberof PesquisaForm
     */
    public get numeroRegistro(): AbstractControl {
        return this.get('numeroRegistro');
    }

    /**
     * @readonly
     * @type {AbstractControl}
     * @memberof PesquisaForm
     */
    public get atribuido(): AbstractControl {
        return this.get('atribuido');
    }

    /**
     * @returns {*}
     * @memberof PesquisaForm
     */
    public getDadosForm(): any {
        this.deleteControlValuesNull();
        return this.value;
    }

    /**
     * @param {string} controlName
     * @param {string} label
     * @returns {string}
     * @memberof PesquisaForm
     */
    public getFirstErrorFrom(controlName: string, label: string): string {
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]]
            .replace('%s', label || controlName);
    }

    /**
     * @memberof PesquisaForm
     */
    public markAllAsTouched(): void {
        // tslint:disable-next-line: ban
        Object.keys(this.controls).forEach((control) =>
            this.get(control).markAsTouched());
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }

}
