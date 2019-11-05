import React from 'react';
import { message } from 'antd';
import Fetch from '../Fetch';
import qs from 'query-string';
import { replaceQuery } from './link';
import { getColumnSearchProps, getColumnFilterProps, getColumnDateStartEnd, getColumnSelectUrlProps } from './columnsearch';
import { __RouterContext } from 'react-router-dom'
import { getFilterOp } from '../constant'

const getOrder = (query) => {
    if (query !== undefined && query !== '') {
        const s = query.split('-')
        return { key: s[0], order: s[1] }
    }
    return null;
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'RELOAD':
            return { ...state, reload: true, loading: true };
        case 'ALL':
            return { ...state, ...action.payload }
        default: return state;
    }
}

const useTable = (url, initialstate, options = { key: 't_' }) => {
    const router = React.useContext(__RouterContext);
    const qKey = options.key || 't_';
    const q = qs.parse(router.location.search)
    const page = parseInt(q[`${qKey}page`]) || 1;
    const pageSize = parseInt(q[`${qKey}pagesize`]) || 5;
    const ord = getOrder(q[`${qKey}order`])
    //filtering is here
    const sKey = `${qKey}search_`;
    let f = {}
    for (let k in q) {
        if (k.includes(sKey)) {
            const key = k.substring(sKey.length);
            f[key] = q[k]
        }
    }
    const [state, dispatch] = React.useReducer(reducer, {
        reload: true, loading: true, data: [], total: 0,
        page, pageSize, ...initialstate
    })
    const ref = React.useRef({
        page, pageSize, anyOrder: false, order: ord === null ? initialstate.order || {} : ord,
        filter: { ...initialstate.filter, ...f }
    })

    const genFilterUrl = (url, filter, order1 = {}) => {
        let ret = 'filter=';
        for (let k in filter) {
            if (filter[k] !== undefined) {
                if (k.includes('::')) {
                    const sp = k.split('::')
                    ret += `(${sp[0]},,${getFilterOp(url, k)},,${filter[k]})`
                } else
                    ret += `(${k},,${getFilterOp(url, k)},,${filter[k]})`
            }
        }
        const o = order1.key ? `order=${order1.key} ${order1.order === 'ascend' ? 'asc' : 'desc'}` : ''
        return `${url}&${o}&${encodeURI(ret)}`;
    }

    React.useEffect(() => {
        const reload = async () => {
            try {
                const { data, total } = await Fetch.get(genFilterUrl(`${url}${url.indexOf('?') < 0 ? '?' : '&'}offset=${(ref.current.page - 1) * ref.current.pageSize}&limit=${ref.current.pageSize}`,
                    ref.current.filter, ref.current.order));
                dispatch({
                    type: 'ALL', payload: {
                        data: data, total: total, loading: false, reload: false,
                        page: ref.current.page, pageSize: ref.current.pageSize
                    }
                })
            } catch (err) {
                message.error('Tidak dapat load table: ' + err);
            }
        }
        if (state.reload) {
            reload();
        }
    }, [state.reload, url])

    const pageChange = (page, pageSize) => {
        if (page === ref.current.page && pageSize === ref.current.pageSize) return;
        ref.current.page = page || ref.current.page
        ref.current.pageSize = pageSize || ref.current.pageSize
        replaceQuery(router, [`${qKey}page=${page}`, `${qKey}pagesize=${pageSize}`])
        dispatch({ type: 'RELOAD' })
    }

    const handleSearch = (dataIndex, selectedKey, confirm) => {
        confirm();
        ref.current.filter = { ...ref.current.filter, [dataIndex]: selectedKey[0] }
        replaceQuery(router, [`${qKey}search_${dataIndex}=${selectedKey[0]}`, `${qKey}page=1`])
        dispatch({ type: 'RELOAD' })
    }

    const handleReset = (dataIndex, clearFilter) => {
        clearFilter();
        const { [dataIndex]: DataIndex, ...rest } = ref.current.filter;
        ref.current.filter = rest
        replaceQuery(router, [{ replace: `${qKey}search_${dataIndex}=`, clear: true }, `${qKey}page=1`])
        dispatch({ type: 'RELOAD' })
    }

    const columnProps = ({ key, hint, options, type, number = true, dataIndex, valueIndex, url }) => {
        if (type === undefined || type === 'text')
            return {
                ...getColumnSearchProps(key, hint, handleSearch, handleReset),
                filteredValue: ref.current.filter[key] !== undefined ? [ref.current.filter[key]] : []
            }
        else if (type === 'radio')
            return {
                ...getColumnFilterProps(key, options, handleSearch, handleReset),
                filteredValue: ref.current.filter[key] !== undefined ? [number ? parseInt(ref.current.filter[key]) : ref.current.filter[key]] : []
            }
        else if (type === 'startend')
            return {
                ...getColumnDateStartEnd(key, handleSearch, handleReset),
                filteredValue: ref.current.filter[key] !== undefined ? [ref.current.filter[key]] : []
            }
        else if (type === 'selecturl')
            return {
                ...getColumnSelectUrlProps(key, hint, handleSearch, handleReset, url, dataIndex, valueIndex)
            }
    }

    const onTableChange = (pag, fil, sort) => {
        if (!ref.current.anyOrder) return
        if (sort.field === undefined) {
            replaceQuery(router, { replace: `${qKey}order=${sort.field}-${sort.order}`, clear: true })
            ref.current.order = {}
            dispatch({ type: 'RELOAD' })
        } else if (sort.field === ref.current.order.key && sort.order !== ref.current.order.order) {
            ref.current.order = { key: sort.field, order: sort.order }
            replaceQuery(router, { replace: `${qKey}order=${sort.field}-${sort.order}` })
            dispatch({ type: 'RELOAD' })
        } else if (sort.field !== ref.current.order.key) {
            ref.current.order = { key: sort.field, order: sort.order }
            replaceQuery(router, { replace: `${qKey}order=${sort.field}-${sort.order}` })
            dispatch({ type: 'RELOAD' })
        }
    }

    const sortProps = (key) => {
        if (!ref.current.anyOrder)
            ref.current.anyOrder = true
        return {
            sorter: true,
            sortOrder: ref.current.order.key === key ? ref.current.order.order ? ref.current.order.order : false : false,
        }
    }

    return [state, {
        tableProps: {
            loading: state.loading,
            pagination: {
                total: state.total, pageSize: state.pageSize, current: state.page,
                pageSizeOptions: ['5', '10', '25', '50'],
                showSizeChanger: true, showLessItems: true, hideOnSinglePage: false, showQuickJumper: true,
                onChange: pageChange, onShowSizeChange: pageChange,
            },
            dataSource: state.data,
            rowKey: 'id',
            scroll: { x: true },
            size: 'small',
            bordered: true,
            onChange: onTableChange,
        },
        reload: () => dispatch({ type: 'RELOAD', payload: true }),
        columnProps, sortProps
    }]
}

export default useTable;