import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Fetch from '../../Fetch';
import { pop, push } from '../../component/link';

const Actions = props => {
    const [loading, setLoading] = React.useState(false);
    const onConfirm = async () => {
        setLoading(true);
        try {
            await Fetch.del(`/user/${props.dataId}`);
            message.info('User berhasil dihapus');
            if (props.reload !== undefined) {
                props.reload();
            } else {
                pop(props, '/user');
            }
        } catch (err) {
            message.error('Error: ' + err);
        }
    }
    return (
        <Button.Group>
            <Button href={`/user/${props.dataId}/edit`} onClick={(e) => {
                e.preventDefault();
                push(props, `/user/${props.dataId}/edit`);
            }}>Edit</Button>
            <Popconfirm placement="bottomLeft" title={"Yakin menghapus user?"} onConfirm={onConfirm} okText="Iya" cancelText="Tidak">
                <Button type="danger" loading={loading}>Hapus</Button>
            </Popconfirm>
        </Button.Group>
    );
}

Actions.propTypes = {
    dataId: PropTypes.string.isRequired,
    reload: PropTypes.func,
}

export default withRouter(Actions);