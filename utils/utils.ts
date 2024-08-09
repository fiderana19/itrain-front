export function formatMoney(m : number | undefined) {
    if(typeof m == "undefined") {return '0'}
    return m.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')
}