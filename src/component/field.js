import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';

const TextField = props => {
    return (
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
            <Row >
                <Col span={props.labelSpan} ><Typography.Text strong style={{ color: '#808080' }}>{props.label}</Typography.Text></Col>
                <Col span={props.valueSpan} >{props.children}</Col>
            </Row>
        </div>
    );
}

TextField.propTypes = {
    labelSpan: PropTypes.number,
    valueSpan: PropTypes.number,
    label: PropTypes.string.isRequired,
}

TextField.defaultProps = {
    labelSpan: 5,
    valueSpan: 19
}

export { TextField }