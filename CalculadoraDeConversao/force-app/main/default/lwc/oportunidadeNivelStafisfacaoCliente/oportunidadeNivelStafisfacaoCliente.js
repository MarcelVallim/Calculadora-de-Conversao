import { LightningElement, track, api, wire } from 'lwc';
import valorSurvey from '@salesforce/apex/IdentificaValorSurvey.retornaValorSurvey';

export default class OportunidadeNivelSatisfacaoCliente extends LightningElement {
    @track nivelDeSatisfacao = 1;
    @track rotuloSatisfacao = 'Moderado';
    @track mostrarBarra = false;
    @track larguraNovaBarra = 'width: 0%;';
    @api recordId;
    @api rec;

    @wire(valorSurvey, { oppId: '$recordId' })
    wiredReturnValue({ error, data }) {
        if (data) {
            this.atualizarNivelDeSatisfacao(data);
            this.mostrarBarra = true;
            this.atualizarRotuloSatisfacao();
            this.atualizarEstiloTermometro();
        } else if (error) {
            console.error('Erro ao obter o valor da pesquisa:', error);
        }
    }

    get larguraTermometro() {
        return `width: ${this.nivelDeSatisfacao * 20}%;`; 
    }

    atualizarNivelDeSatisfacao(valor) {
        switch (valor) {
            case 'Muito Satisfeito':
                this.nivelDeSatisfacao = 5;
                break;
            case 'Satisfeito':
                this.nivelDeSatisfacao = 4;
                break;
            case 'Moderado':
                this.nivelDeSatisfacao = 3;
                break;
            case 'Pouco Satisfeito':
                this.nivelDeSatisfacao = 2;
                break;
            case 'Muito Pouco Satisfeito':
                this.nivelDeSatisfacao = 1;
                break;
            default:
                this.nivelDeSatisfacao = 1;
                break;
        }
    }

    atualizarRotuloSatisfacao() {
        switch (this.nivelDeSatisfacao) {
            case 1:
                this.rotuloSatisfacao = 'Muito Pouco Satisfeito';
                break;
            case 2:
                this.rotuloSatisfacao = 'Pouco Satisfeito';
                break;
            case 3:
                this.rotuloSatisfacao = 'Moderado';
                break;
            case 4:
                this.rotuloSatisfacao = 'Satisfeito';
                break;
            case 5:
                this.rotuloSatisfacao = 'Muito Satisfeito';
                break;
            default:
                this.rotuloSatisfacao = '';
                break;
        }
    }

    atualizarEstiloTermometro() {
        switch (this.nivelDeSatisfacao) {
            case 1:
                this.larguraNovaBarra = 'width: 20%; background-color: darkred;';
                break;
            case 2:
                this.larguraNovaBarra = 'width: 40%; background-color: lightcoral;';
                break;
            case 3:
                this.larguraNovaBarra = 'width: 60%; background-color: yellow;';
                break;
            case 4:
                this.larguraNovaBarra = 'width: 80%; background-color: lightgreen;';
                break;
            case 5:
                this.larguraNovaBarra = 'width: 100%; background-color: darkgreen;';
                break;
            default:
                this.larguraNovaBarra = 'width: 0%;';
                break;
        }
    }
}