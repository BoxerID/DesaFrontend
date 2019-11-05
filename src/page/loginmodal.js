import React from 'react'
import { Modal, Form, Input, Icon, Button, message } from 'antd';
import { GlobalStore } from '../store/store'
import Fetch from '../Fetch'

const LoginModal = props => {
    const { getFieldDecorator, resetFields } = props.form;
    const [{ global }, dispatch] = React.useContext(GlobalStore)
    const [state, setState] = React.useState({ loading: false })

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setState({ ...state, loading: true })
                const result = await fetch(Fetch.getUrl('/auth'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                        onetime: true,
                    })
                });
                const json = await result.json();
                if (result.status === 200) {
                    resetFields();
                    dispatch({ type: 'OPEN_AUTHORIZE', payload: false })
                    setState({ ...state, loading: false })
                    global.loginCallback(json.access_token)
                } else {
                    message.error('Authorize failed: ' + json.error);
                    setState({ ...state, loading: false })
                }
            }
        });
    }

    return <Modal visible={global.loginVisible} title="Authorize" onCancel={() => dispatch({ type: 'OPEN_AUTHORIZE', payload: false })} width={400} footer={null}>
        <Form onSubmit={handleSubmit} name="authorize">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" autoComplete="false" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" autoComplete="false" />
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={state.loading}>
                    Authorize
                </Button>
            </Form.Item>
        </Form>
    </Modal>
}

export default Form.create({ name: 'authorize' })(LoginModal);