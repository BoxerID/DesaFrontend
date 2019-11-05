import React from 'react';
import { Layout } from 'antd';
import LayoutHeader from './header'
import MySider from './sider';

const MyLayout = props => {
    return (
        <Layout style={{ height: '100%' }}>
            <Layout.Header style={{ background: 'OliveDrab', padding: 0 }} >
                <LayoutHeader {...props} />
            </Layout.Header>
            <Layout style={{ height: '100%' }}>
                <MySider {...props} />
                <Layout.Content style={{ height: '100%', width: '100%', background: '#f1f1f1', padding: '8px' }}>
                    {props.children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default MyLayout;