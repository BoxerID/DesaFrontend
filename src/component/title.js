import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

const Title = props => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text strong>{props.title}</Typography.Text>
            {props.actions}
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.node,
}

export default Title;