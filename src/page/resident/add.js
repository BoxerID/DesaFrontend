import React from 'react';
import { Card, Form, Row, Col, Divider, Button, Input, message, Icon, Select, Upload, Typography, DatePicker, InputNumber } from 'antd';
import Title from '../../component/title';
import Fetch from '../../Fetch';
import { pop } from '../../component/link';
import MySelect from '../../component/select';
import { InputText } from '../../component/input';

const Add = props => {
    const { getFieldDecorator, setFieldsValue } = props.form;
    const edit = props.match.params.id !== undefined;
    const [state, setState] = React.useState({ loading: edit, saveLoading: false, imageUrl: null, uploading: false, citizen: undefined });

    const formSummited = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    setState({ ...state, saveLoading: true })
                    if (edit) {
                        await Fetch.put(`/resident/${props.match.params.id}`, values);
                        message.info('Penduduk berhasil diedit');
                    } else {
                        await Fetch.post('/resident', values);
                        message.info('Penduduk berhasil ditambahkan');
                    }
                    setState({ ...state, saveLoading: false })
                    pop(props, '/resident');
                } catch (err) {
                    message.error('Error: ' + err);
                    setState({ ...state, saveLoading: false })
                }
            }
        });
    }

    /*React.useEffect(() => {
        if (edit) fetchData();
    }, [edit]);*/

    const fetchData = async () => {
        setState({ ...state, loading: true });
        const data = await Fetch.get(`/resident/${props.match.params.id}`);
        setState({ ...state, loading: false });
        setFieldsValue({
            name: data.name,
            digit: data.digit,
            cash: data.cash,
        });
    }

    const uploadButton = (
        <div>
            <Icon type={state.uploading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Card title={<Title title={edit ? "Edit penduduk" : "Tambah penduduk"} {...props} />} loading={state.loading}>
            <Form layout="vertical" name="create" onSubmit={formSummited} >
                <Row gutter={32}>
                    <Col span={8}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <Upload showUploadList={false} listType="picture-card" name="file" style={{ width: '100%', height: '100%' }}>
                                {state.imageUrl !== null ? <img src={state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="NIK">
                            {getFieldDecorator('nik', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <Input placeholder="Masukkan nama" />
                            )}
                        </Form.Item>
                        <Form.Item label="Nama">
                            {getFieldDecorator('fullname', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan nama lengkap" />
                            )}
                        </Form.Item>
                        <Row gutter={32}>
                            <Col span={12}>
                                <Form.Item label="Agama">
                                    {getFieldDecorator('religion', {
                                        rules: [{ required: true, message: 'Harus diisi' }]
                                    })(
                                        <MySelect url="/religion" dataIndex="name" valueIndex="_id" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Status kependudukan">
                                    {getFieldDecorator('residentStatus', {
                                        rules: [{ required: true, message: 'Harus diisi' }]
                                    })(
                                        <Select>
                                            <Select.Option key="tetap" >Tetap</Select.Option>
                                            <Select.Option key="tidaktetap" >Tidak tetap</Select.Option>
                                            <Select.Option key="pendatang" >Pendatang</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={32}>
                            <Col span={12}>
                                <Form.Item label="Hubungan dalam keluarga">
                                    {getFieldDecorator('familyPosition', {
                                        rules: [{ required: true, message: 'Harus diisi' }]
                                    })(
                                        <MySelect url="/familyposition" dataIndex="name" valueIndex="_id" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Jenis kelamin">
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true, message: 'Harus diisi' }]
                                    })(
                                        <Select>
                                            <Select.Option key="man" >Laki-laki</Select.Option>
                                            <Select.Option key="woman" >Perempuan</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Typography.Title level={4}>Data kelahiran</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label="Nomor akta lahir">
                            {getFieldDecorator('birthCertificateNumber', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan nomor akta lahir" />
                            )}
                        </Form.Item>
                        <Form.Item label="Tempat lahir">
                            {getFieldDecorator('birthPlace', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan tempat lahir" />
                            )}
                        </Form.Item>
                        <Form.Item label="Tanggal lahir">
                            {getFieldDecorator('birthDate', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <DatePicker placeholder="Pilih tanggal lahir" format="DD-MMM-YYYY HH:mm" showTime={{ format: 'HH:mm' }} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Anak ke-">
                            {getFieldDecorator('birthOrder')(
                                <InputNumber placeholder="Masukkan anak ke-" style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Berat lahir">
                            {getFieldDecorator('birthWeight')(
                                <InputNumber placeholder="Berat lahir" style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Panjang lahir">
                            {getFieldDecorator('birthLength')(
                                <InputNumber placeholder="Panjang lahir" style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Jenis kelahiran">
                            {getFieldDecorator('birthType')(
                                <MySelect url="/birthtype" dataIndex="name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Tempat dilahirkan">
                            {getFieldDecorator('birthLocation')(
                                <MySelect url="/birthlocation" dataIndex="name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Penolong kelahiran">
                            {getFieldDecorator('birthHelper')(
                                <MySelect url="/birthhelper" dataIndex="name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Typography.Title level={4}>Pekerjaan</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label="Pendidikan di KK">
                            {getFieldDecorator('educationKK')(
                                <MySelect url="/education" dataIndex="name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Pendidikan sedang ditempuh">
                            {getFieldDecorator('educationOnProgress')(
                                <MySelect url="/education" dataIndex="name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Pekerjaan">
                            {getFieldDecorator('job')(
                                <MySelect url="/job" dataIndex="name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Typography.Title level={4}>Kewarganegaraan</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label="Status warga negara">
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <Select onChange={v => {
                                    setState({ ...state, citizen: v })
                                }}>
                                    <Select.Option key="wni" >WNI</Select.Option>
                                    <Select.Option key="wna" >WNA</Select.Option>
                                    <Select.Option key="double" >Dobel</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        {state.citizen === 'wna' && <Form.Item label="Masa berlaku passport">
                            {getFieldDecorator('pasporExpired')(
                                <DatePicker placeholder="Pilih masa berlaku" format="DD-MMM-YYYY" />
                            )}
                        </Form.Item>}
                        {state.citizen === 'wna' && <Form.Item label="Nomor Passpor">
                            {getFieldDecorator('passportNumber')(
                                <InputText placeholder="Nomor passpor" />
                            )}
                        </Form.Item>}
                    </Col>
                    <Col span={8}>
                        {state.citizen === 'wna' && <Form.Item label="Nomor KITAS/KITAP">
                            {getFieldDecorator('kitasNumber')(
                                <InputText placeholder="Nomor KITAS/KITAP" />
                            )}
                        </Form.Item>}
                    </Col>
                </Row>
                <Typography.Title level={4}>Data orang tua</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label="NIK Ayah">
                            {getFieldDecorator('father.nik', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan NIK Ayah" />
                            )}
                        </Form.Item>
                        <Form.Item label="Nama Ayah">
                            {getFieldDecorator('father.fullname', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan nama ayah" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="NIK Ibu">
                            {getFieldDecorator('mother.nik', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan NIK Ibu" />
                            )}
                        </Form.Item>
                        <Form.Item label="Nama Ibu">
                            {getFieldDecorator('mother.fullname', {
                                rules: [{ required: true, message: 'Harus diisi' }]
                            })(
                                <InputText placeholder="Masukkan nama ibu" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <Typography.Title level={4}>Alamat</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <Typography.Title level={4}>Status perkawinan</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
                <Typography.Title level={4}>Data kesehatan</Typography.Title>
                <Divider />
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label="Golongan darah">
                            {getFieldDecorator('bloodType')(
                                <MySelect url="/bloodtype" dataIndex="name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Akseptor KB">
                            {getFieldDecorator('akseptorKB')(
                                <MySelect url="/akseptorkb" dataIndex="name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Disability">
                            {getFieldDecorator('disability')(
                                <MySelect url="/disability" dataIndex="name" mode="multiple" />
                            )}
                        </Form.Item>
                        <Form.Item label="Penyakit menahun">
                            {getFieldDecorator('chronicPain')(
                                <MySelect url="/chronicpain" dataIndex="name" mode="multiple" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Asuransi">
                            {getFieldDecorator('insurance')(
                                <MySelect url="/insurance" dataIndex="name" />
                            )}
                        </Form.Item>
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

export default Form.create({ name: 'create' })(Add);