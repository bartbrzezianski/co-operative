import React, {FC} from 'react';
import './CurrencyDropdownItem.css';

interface CurrencyDropdownItemProps {
    currencyCode: string;
    currencyName: string;
    isSelected?: boolean;
    onClick(currencyCode: string): void;
}

const CurrencyDropdownItem: FC<CurrencyDropdownItemProps> = (props) => (
    <div onClick={() => props.onClick(props.currencyCode)} className="CurrencyDropdownItem" is-selected={props.isSelected ? "true": "false"} data-testid="CurrencyDropdownItem">
        <div className="CurrencyDropdownItem_CurrencyCode">{props.currencyCode}</div>
        <div className="CurrencyDropdownItem_Separator">/</div>
        <div className="CurrencyDropdownItem_CurrencyName">{props.currencyName}</div>

    </div>
);

export default CurrencyDropdownItem;
