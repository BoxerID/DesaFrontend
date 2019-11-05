import moment from 'moment';

const monthToString = (m) => {
    let mom = new moment();
    return mom.month(m - 1).format('MMMM');
}

const searchUrl = (search, replace, clear) => {
    const split = replace.split('=');
    if (search.includes(split[0])) {
        if (clear) return search.replace(new RegExp(`${split[0]}=[0-9A-Za-z-_]+&*`), '')
        return search.replace(new RegExp(`${split[0]}=[0-9A-Za-z-_]+&*`), `${replace}&`)
    }
    if (search === '')
        return !clear ? `?${replace}` : '';
    return !clear ? `${search}&${replace}` : search;
}

const replaceQueryString = (path, search, replacement, clear) => {
    let f = search;
    if (Array.isArray(replacement)) {
        for (let i = 0; i < replacement.length; i++) {
            const s = replacement[i];
            if (typeof s === 'object') {
                f = searchUrl(f, s.replace, s.clear || false)
            } else {
                f = searchUrl(f, s)
            }
        }
        return `${path}${f}`
    }
    return `${path}${searchUrl(f, replacement, clear)}`
}

const formatDate = (d, dateonly = true) => {
    if (d === null || d === undefined || d === '') return '-';
    if (dateonly) return moment(d).format('DD/MM/YYYY')
    return moment(d).format('DD/MM/YYYY hh:mm')
}

const formatMoney = (d) => {
    if (d === null || d === undefined || d === '') return 0;
    return parseInt(d).toLocaleString('in-ID')
}

const getDefaultCurMonth = () => {
    const m1 = moment().startOf('month')
    const m2 = moment().endOf('month')
    return `${m1.format('YYYY-MM-DD')} ${m2.format('YYYY-MM-DD')}`
}

const getDefaultCurYear = () => {
    const m1 = moment().startOf('year')
    const m2 = moment().endOf('year')
    return `${m1.format('YYYY-MM-DD')} ${m2.format('YYYY-MM-DD')}`
}

export {
    replaceQueryString, monthToString, formatDate, formatMoney, getDefaultCurMonth, getDefaultCurYear
}