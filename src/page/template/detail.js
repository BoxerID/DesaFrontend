import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import Title from '../../component/title';
import { useDetail } from '../../component/detail';
import Action from './action';
import { TextField } from '../../component/field'
import { LabelHeader } from '../../component/header'

const Detail = props => {
    const [{ record, loading }] = useDetail(`/student/${props.match.params.id}`);

    return (
        <Card loading={loading} title={<Title title={"Detail siswa"} actions={<Action dataId={record.id || '1'} />} />} >
            {!loading && <Row gutter={16}>
                <Col span={12}>
                    <TextField label="Tahun Ajaran">{record.year.name}</TextField>
                    <TextField label="Kelas">{record.class.name}</TextField>
                </Col>
                <Col span={12}>
                    <LabelHeader>Guru</LabelHeader>
                    <Table dataSource={record.teachers}>
                        <Table.Column dataIndex="name" title="Nama" />
                    </Table>
                </Col>
            </Row>}
        </Card >
    );
}

export default Detail;