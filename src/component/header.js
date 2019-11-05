import React from 'react'
import { Typography, Divider } from 'antd';
import PropTypes from 'prop-types'

const LabelHeader = props => {
    return (
        <div style={{ marginTop: props.useTopMargin ? 30 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Text style={{ fontSize: 16, color: '#505050' }}>{props.children}</Typography.Text>
                {/*<div style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                    <Divider style={{ margin: '15px 0' }} />
    </div>*/}
                {props.actions}
            </div>
            <Divider style={{ margin: '15px 0' }} />
        </div>
    )
}

LabelHeader.propTypes = {
    useTopMargin: PropTypes.bool,
    actions: PropTypes.node
}

LabelHeader.defaultProps = {
    useTopMargin: true
}

export { LabelHeader }