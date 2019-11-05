import React from 'react';
import { Card, Form, Row, Col, Divider, Button, Input, message, Checkbox, InputNumber } from 'antd';
import Title from '../../component/title';
import Fetch from '../../Fetch';
import { pop } from '../../component/link';

const Add = props => {
    const { getFieldDecorator, setFieldsValue } = props.form;
    const edit = props.match.params.id !== undefined;
    const [state, setState] = React.useState({ loading: edit, saveLoading: false });
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        colon: false, labelAlign: 'left'
    };

    const formSummited = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    setState({ ...state, saveLoading: true })
                    if (edit) {
                        await Fetch.put(`/bank/${props.match.params.id}`, values);
                        message.info('Bank berhasil diedit');
                    } else {
                        await Fetch.post('/bank', values);
                        message.info('Bank berhasil ditambahkan');
                    }
                    setState({ ...state, saveLoading: false })
                    pop(props, '/bank');
                } catch (err) {
                    message.error('Error: ' + err);
                    setState({ ...state, saveLoading: false })
                }
            }
        });
    }

    React.useEffect(() => {
        if (edit) fetchData();
    }, []);

    const fetchData = async () => {
        setState({ ...state, loading: true });
        const data = await Fetch.get(`/bank/${props.match.params.id}`);
        setState({ ...state, loading: false });
        setFieldsValue({
            name: data.name,
            digit: data.digit,
            cash: data.cash,
        });
    }

    return (
        <Card title={<Title title={edit ? "Edit bank" : "Tambah bank"} {...props} />} loading={state.loading}>
            <Form layout="horizontal" name="create_bank" onSubmit={formSummited} {...formItemLayout}>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label="Nama bank">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <Input placeholder="Masukkan nama bank" />
                            )}
                        </Form.Item>
                        <Form.Item label="Digit">
                            {getFieldDecorator('digit', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputNumber style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Cash / Non Cash">
                            {getFieldDecorator('cash', { valuePropName: 'checked' })(
                                <Checkbox>Cash</Checkbox>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    </Col>
                </Row>
                <Divider />
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={state.saveLoading} > Simpan</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Form.create({ name: 'create_bank' })(Add);