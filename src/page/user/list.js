import React from 'react';
import { Card, Table, Button, Menu, Dropdown, Icon, Popconfirm, message } from 'antd';
import Title from '../../component/title';
import useTable from '../../component/table';
import { MyLink, push } from '../../component/link';
import Fetch from '../../Fetch';

const Actions = props => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button.Group>
                <Button icon="plus" type="primary" href={`/user/add`} onClick={(e) => {
                    e.preventDefault();
                    push(props, `/user/add`);
                }}>Tambah</Button>
                <Button icon="reload" onClick={props.refresh} />
            </Button.Group>
        </div>
    );
}

const List = props => {
    const [, tb] = useTable('/user', {})

    const onConfirm = (id) => {
        return async () => {
            try {
                await Fetch.del(`/user/${id}`);
                message.info("Berhasil menghapus user");
                tb.fetchData();
            } catch (err) {
                message.error("Error menghapus user: " + err);
            }
        }
    }

    const actionMenus = (record) => (
        <Menu>
            <Menu.Item><MyLink to={`/user/${record.id}/edit`}><Icon type="edit" style={{ marginRight: 8 }} />Edit</MyLink></Menu.Item>
            <Menu.Item>
                <Popconfirm placement="bottomRight" title={`Yakin menghapus ${record.name}?`} onConfirm={onConfirm(record.id)} okText="Iya" cancelText="Tidak">
                    <a href="void()"><Icon type="delete" style={{ marginRight: 8 }} />Hapus</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    )

    return (
        <Card title={<Title title={"Daftar User"} actions={<Actions  {...props} refresh={tb.fetchData} />} />}>
            <Table {...tb.tableProps}>
                <Table.Column key="username" dataIndex="username" title="Username" />
                <Table.Column key="name" dataIndex="name" title="Nama" />
                <Table.Column key="phone" dataIndex="phone" title="Phone" />
                <Table.Column key="action" title="Aksi" align="center" width={50} render={(t, r) => {
                    return <Dropdown overlay={actionMenus(r)} trigger={['click']}><a href="void()">aksi</a></Dropdown>
                }} />
            </Table>
        </Card >
    )
}

export default List;