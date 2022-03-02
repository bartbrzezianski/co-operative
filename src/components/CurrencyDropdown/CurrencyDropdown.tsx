import React, {ChangeEvent} from 'react';
import './CurrencyDropdown.css';
import CurrencyDropdownItem from "../CurrencyDropdownItem/CurrencyDropdownItem";

interface CurrencyDropdownProps {
    id: string
    onChange: (currencyCode: string, id: string) => void
    availableCurrencies: IMap<string>
    selectedCurrencyCode: string
}

interface IMap<T> {
    [index: string]: T;
}

interface CurrencyDropdownState {
    isOpen: boolean;
    filter: string;
}

class CurrencyDropdown extends React.Component<CurrencyDropdownProps, CurrencyDropdownState> {
    constructor(props: CurrencyDropdownProps) {
        super(props);
        this.state = {
            isOpen: false,
            filter: ""
        };
    }

    clickHandler = () => {
        this.setOpen(!this.state.isOpen)
    }

    currencySelected = (currencyCode: string) => {
        this.setOpen(false)
        this.props.onChange(currencyCode, this.props.id);
    }

    handleFilterChange = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            filter: ev.target.value,
        });
    }

    setOpen = (isOpen: boolean) => {
        if (!isOpen) {
            this.setState({
                isOpen: false,
                filter: ""
            });
        } else {
            this.setState({isOpen: true});
        }
    }

    render() {
        const arr = [];
        for (const item in this.props.availableCurrencies) {
            if (this.state.filter &&
                (item.toLowerCase().indexOf(this.state.filter.toLowerCase()) === -1 &&
                    this.props.availableCurrencies[item].toLowerCase().indexOf(this.state.filter.toLowerCase()) === -1)) {
                continue
            }

            arr.push(<CurrencyDropdownItem key={item}
                                           currencyCode={item}
                                           currencyName={this.props.availableCurrencies[item]}
                                           isSelected={this.props.selectedCurrencyCode == item}
                                           onClick={() => this.currencySelected(item)}/>
            )
        }

        return <div className="CurrencyDropdown" data-testid="CurrencyDropdown">
            <div onClick={this.clickHandler} className="CurrencyDropdownButton">
                {this.props.selectedCurrencyCode ?
                    <CurrencyDropdownItem currencyName={this.props.availableCurrencies[this.props.selectedCurrencyCode]}
                                          currencyCode={this.props.selectedCurrencyCode}
                                          onClick={this.clickHandler}/> :
                    <div className="CurrencyDropdown_PlaceholderText"> Please select currency to convert </div>
                }
            </div>

            {this.state.isOpen &&
            <div className="CurrencyDropdown_Content">
                <input autoFocus type="text"
                       placeholder="Search"
                       value={this.state.filter}
                       className="CurrencyDropdown_ContentFilter"
                       onChange={this.handleFilterChange}></input>
                <div className="CurrencyDropdown_Currencies">
                    {arr.length > 0 ? arr : <div className="CurrencyDropdown_NoResults">Sorry, no currencies found</div>}
                </div>
            </div>
            }
        </div>
    }


}

export default CurrencyDropdown;
