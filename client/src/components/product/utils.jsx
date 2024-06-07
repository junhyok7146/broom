export const formatCurrency = (value) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'KRW' }).format(value);
};