import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom = "USD";
    countryTo = "AUD";
    amount = '';
    result;
    error;

    handleChange(event) {
        const { name, value } = event.target;
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    async submitHandler(event) {
        event.preventDefault();
        await this.convert();
    }

    async convert() {
        const API_KEY = 'd9bc3c05986401e750c92206e76cb5fc';
        const API_URL = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${this.countryFrom}&to=${this.countryTo}&amount=${this.amount}&format=1`;
    
        try {
            const response = await fetch(API_URL);
            const jsonData = await response.json();
    
            if (jsonData.success) {
                this.result = (jsonData.result).toFixed(2);
                console.log(this.result);
            } else {
                this.error = jsonData.error.info;
            }
        } catch (error) {
            console.error(error);
            this.error = "An error occurred. Please try again...";
        }
    }
    
    
    }