import React, {ChangeEvent, ChangeEventHandler, FormEvent} from 'react';
import './Converter.css';
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import ExpiryCounter from "../ExpiryCounter/ExpiryCounter";

interface IMap<T> {
    [index: string]: T;
}

interface ConverterProps {

}

interface ConverterState {
    convFromAmount: string
    convFromCurrency: string
    convToAmount: string
    convToCurrency: string
    isDirty: boolean
    availableCurrencies: IMap<string>

}

class Converter extends React.Component<ConverterProps, ConverterState> {
    static readonly URL = "https://openexchangerates.org/api/currencies.json";

    constructor(props: ConverterProps) {
        super(props);

        this.state = {
            convFromAmount: "",
            convToAmount: "",
            convFromCurrency: "",
            convToCurrency: "",
            isDirty: true,
            availableCurrencies: {}

        };
    }

    componentDidMount() {
        const rq = new XMLHttpRequest();
        rq.open("GET", Converter.URL);
        rq.send();

        rq.onerror = () => {
            //handle error here
        }

        rq.onload = () => {
            this.setState({availableCurrencies: JSON.parse(rq.responseText)});
        }
    }

    canSwapCurrencies = () => {
        if (!this.state.convFromCurrency && !this.state.convToCurrency) {
            return false;
        }

        return true;
    }

    swapCurrencies = () => {
        this.setState({
            convToCurrency: this.state.convFromCurrency,
            convFromCurrency: this.state.convToCurrency
        })

        this.setDirty()
    }

    canConvert = () => {
        if (this.state.convFromCurrency && this.state.convToCurrency && this.state.convFromAmount) {
            return true;
        }

        return false;
    }

    handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
        if (!regexp.test(ev.target.value)) {
            return;
        }


        this.setState({
            convFromAmount: ev.target.value,
            isDirty: true
        });
    }

    submitForm = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (!this.canConvert()) {
            return
        }

        const urlRequest = "https://api.exchangerate-api.com/v4/latest/" + this.state.convFromCurrency;

        const rq = new XMLHttpRequest();
        rq.open("GET", urlRequest);
        rq.send();
        rq.onerror = () => {
            //TODO: handle error here
        }

        interface ExchangeRateResponse {
            rates: IMap<number>
        }

        rq.onload = () => {
            this.setState({isDirty: false})
            const resp: ExchangeRateResponse = JSON.parse(rq.responseText);
            const exchangeRate = resp.rates[this.state.convToCurrency]
            const exchangeValue = (exchangeRate * (+this.state.convFromAmount)).toFixed(2)

            this.setState({
                convToAmount: "" + exchangeValue
            })
        }
    }

    onDropdownChange = (currencyCode: string, id: string) => {
        if (id == "from") {
            if (this.state.convToCurrency === currencyCode) {
                this.swapCurrencies()
            } else {
                this.setState({convFromCurrency: currencyCode})
            }
        }

        if (id == "to") {
            if (this.state.convFromCurrency === currencyCode) {
                this.swapCurrencies()
            } else {
                this.setState({convToCurrency: currencyCode})
            }
        }

        this.setDirty()

    }

    setDirty = () => {
        this.setState({isDirty: true})
    };

    render() {

        const switchCurrenciesButton = this.canSwapCurrencies() ?
            <button type="button" disabled={!this.canSwapCurrencies()}
                    onClick={this.swapCurrencies}
                    className="ConverterInput_Button"> &#x21C4;</button> : ""

        return <form className="Converter" data-testid="Converter" onSubmit={this.submitForm}>
            <div className="ConverterInputWrapper">
                <label
                    className={!this.state.convFromAmount ? "ConverterInput_Label" : "ConverterInput_Label ConverterInput_Label-top"}
                    htmlFor="amount">Amount</label>

                <div className="ConverterInput">
                    <input id="amount" type="text" value={this.state.convFromAmount}
                           onChange={this.handleInputChange} className="ConverterInput_Input"/>
                    {switchCurrenciesButton}
                </div>

            </div>

            <CurrencyDropdown id="from" onChange={this.onDropdownChange}
                              availableCurrencies={this.state.availableCurrencies}
                              selectedCurrencyCode={this.state.convFromCurrency}
            />
            <CurrencyDropdown id="to" onChange={this.onDropdownChange}
                              availableCurrencies={this.state.availableCurrencies}
                              selectedCurrencyCode={this.state.convToCurrency}
            />


            {
                !this.state.isDirty &&
                <div>
                    <div
                        className="Converter_ConversionResult"> {this.state.convFromAmount} {this.state.convFromCurrency} is
                        equivalent
                        to {this.state.convToCurrency} {this.state.convToAmount}</div>
                    <ExpiryCounter timerExpired={() => {
                        this.setDirty()
                    }}/>
                </div>


            }


            <div className="Converter_ConvertButtonWrapper">
                <input type="submit"
                       className="Converter_ConvertButton"
                       value="Convert"
                       disabled={!this.canConvert()}/>
            </div>
        </form>
    }
}

export default Converter;
