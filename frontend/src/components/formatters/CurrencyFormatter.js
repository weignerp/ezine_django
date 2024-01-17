import React from 'react';
import { FormattedNumber } from 'react-intl';

const CurrencyFormatter = ({ amount, currencyCode }) => {
    return (
        <>
            {/* Use FormattedNumber for currency formatting */}
            <FormattedNumber
                value={amount}
                style='currency'
                currency={currencyCode}
            />
        </>
    );
};

export default CurrencyFormatter;
