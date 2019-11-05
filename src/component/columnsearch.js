import React from 'react';
import { Input, Button, Icon, Radio, DatePicker } from 'antd';
import moment from 'moment'
import MySelect from './select'

const getColumnSearchProps = (dataIndex, placeholder, handleSearch, handleReset) => {
    let searchInput = null;
    return ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => searchInput = node}
                        placeholder={placeholder}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        style={{ width: 200, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Cari
                    </Button>
                    <Button
                        onClick={() => handleReset(dataIndex, clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
        </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
    })
};

const getColumnFilterProps = (dataIndex, options, handleSearch, handleReset) => {
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => {
            return (
                <div style={{ padding: 8 }}>
                    <Radio.Group style={{ marginBottom: 8, display: 'block' }} value={selectedKeys[0]} onChange={(e) => setSelectedKeys(e.target.value !== undefined ? [e.target.value] : [])}>
                        {options.map(v => <Radio key={v.value} style={radioStyle} value={v.value}>{v.text}</Radio>)}
                    </Radio.Group>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Cari
                    </Button>
                    <Button
                        onClick={() => handleReset(dataIndex, clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
        </Button>
                </div>
            )
        },
        filterIcon: filtered => <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
    })
};

const getColumnDateStartEnd = (dataIndex, handleSearch, handleReset) => {
    return ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => {
            const split = selectedKeys[0] ? selectedKeys[0].split(' ') : [];
            return (
                <div style={{ padding: 8 }}>
                    <DatePicker.RangePicker style={{ width: 250, display: 'block', lineHeight: 3 }} format="DD-MM-YYYY"
                        onChange={v => setSelectedKeys(v[0] ? [`${v[0].format('YYYY-MM-DD')} ${v[1].format('YYYY-MM-DD')}`] : [])}
                        value={split.length > 1 ? [moment(split[0]), moment(split[1])] : null} />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(dataIndex, selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Cari
                    </Button>
                    <Button onClick={() => handleReset(dataIndex, clearFilters)} size="small" style={{ width: 90 }}>Reset</Button>
                </div>
            )
        },
        filterIcon: filtered => <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
    })
};

const getColumnSelectUrlProps = (key, placeholder, handleSearch, handleReset, url, dataIndex, valueIndex) => {
    return ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <MySelect
                        url={url} dataIndex={dataIndex} valueIndex={valueIndex}
                        placeholder={placeholder}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e ? [e] : [])}
                        style={{ width: 300, marginBottom: 8, display: 'block' }}
                        showSearch
                    />
                    <Button type="primary" onClick={() => handleSearch(key, selectedKeys, confirm)}
                        icon="filter" size="small" style={{ width: 90, marginRight: 8 }}>
                        Cari
                    </Button>
                    <Button onClick={() => handleReset(key, clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
    })
};

export { getColumnSearchProps, getColumnFilterProps, getColumnDateStartEnd, getColumnSelectUrlProps }