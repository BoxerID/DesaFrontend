import React, { Fragment } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import Fetch from '../../Fetch';
import { TextField } from '../../component/field';

const Profile = props => {
    const [state, setState] = React.useState({ loading: true, record: {} })
    const { loading, record } = state;

    React.useEffect(() => {
        const fetchData = async () => {
            setState({ ...state, loading: true });
            const data = await Fetch.get('/user/info');
            setState({ ...state, loading: false, record: data })
        }
        fetchData();
    }, [state]);


    return (
        <Card loading={loading} title="Profile" >
            {!loading &&
                <Fragment>
                    <Row gutter={16}>
                        <Col span={6}>
                            <img alt="foto murid" src={Fetch.getUrl(`/public/uploads/userphotos/${record.photo === '' ? 'default.jpg' : record.photo}`)}
                                width={'100%'} style={{ borderRadius: 10 }} />
                        </Col>
                        <Col span={18}>
                            <TextField label="Nama" >{record.name}</TextField>
                            <TextField label="Username" >{record.name}</TextField>
                            <TextField label="Email" >{record.email}</TextField>
                            <TextField label="Telepon" >{record.phone}</TextField>
                            <TextField label="Alamat" >{record.address}</TextField>
                        </Col>
                    </Row>
                    <Divider />
                </Fragment>
            }
        </Card >
    );
}

export default Profile;