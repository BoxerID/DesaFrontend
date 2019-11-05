import React from 'react';
import { Select, Divider } from 'antd';
import PropTypes from 'prop-types';
import Fetch from '../Fetch';
import _ from 'lodash'

const MySelect = React.forwardRef((props, ref) => {
    const [state, setState] = React.useState({ loading: false, limit: 10 })
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetchData(props.url);
    }, [props.url]);

    const fetchData = async (url) => {
        try {
            const res = await Fetch.get(url);
            setData(res.data);
        } catch (err) {

        }
    }

    const onChange = v => {
        if (props.onChangeAdv) {
            props.onChangeAdv(data.find(v2 => v2[props.valueIndex] === v))
        }
        props.onChange(v)
    }

    return (
        <Select ref={ref} optionFilterProp="children"
            filterOption={(input, option) => {
                if (typeof option.props.children === 'string')
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                return false
            }}
            {...props} onChange={onChange}>
            {data.map(v => {
                return <Select.Option key={v.id} value={_.get(v, props.valueIndex)}>{_.get(v, props.dataIndex)}</Select.Option>
            })}
            {props.showloadmore && <Select.Option disabled key="loadmore" value={'_'}><div className="span-click" style={{ textAlign: 'center' }} onClick={() => {
                if (!state.loading) {
                    setState({ ...state, loading: true })
                }
            }}><Divider style={{ margin: '1px 0' }} />{state.loading ? 'loading...' : 'load more'}</div></Select.Option>}
        </Select >
    )
});

MySelect.propTypes = {
    url: PropTypes.string.isRequired,
    dataIndex: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['multiple', 'single']),
    placeholder: PropTypes.string,
    valueIndex: PropTypes.string,
    showloadmore: PropTypes.bool,
}

MySelect.defaultProps = {
    mode: 'single',
    valueIndex: 'id',
    showloadmore: false,
}

export default MySelect;