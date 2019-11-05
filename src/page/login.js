import React from 'react'
import { Card, Form, Input, Icon, Button, message } from 'antd';
import Fetch from '../Fetch';
//import { GlobalStore } from '../store/store'

const PageLogin = (props) => {
    const { getFieldDecorator } = props.form;
    const [loading, setLoading] = React.useState(false);
    //const [, reducer] = React.useContext(GlobalStore)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true);
                const result = await fetch(Fetch.getUrl('/auth'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    })
                });
                const json = await result.json();
                if (result.status === 200) {
                    localStorage.setItem('token', json.token);
                    /*localStorage.setItem('live', json.live)
                    localStorage.setItem('refresh_token', json.refresh_token)
                    localStorage.setItem('refresh_live', json.refresh_live)*/
                    /*localStorage.setItem('user', JSON.stringify(json.user));
                    reducer({ type: 'UPDATE_USER', payload: json.user })
                    Permission.setPermission(json.user.user_permissions.map(v => v.permission))
                    Fetch.get('/notification/count').then(r => reducer({ type: 'SET_NOTIFICATION', payload: r.count }))*/
                    setTimeout(() => props.history.replace('/'), 500)
                } else {
                    message.error('Login failed: ' + json.error);
                    setLoading(false);
                }
            }
        });
    }

    return (
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: 300, padding: '70px 0' }}>
            <Card title="Login">
                <Form onSubmit={handleSubmit} name="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                            Log in
                        </Button>
                        <span className="span-click" style={{ float: 'right' }} href="">Forgot password</span>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Form.create({ name: 'login-form' })(PageLogin);