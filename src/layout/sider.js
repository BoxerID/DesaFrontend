import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { MyLink } from '../component/link';
import { GlobalStore } from '../store/store'
import packageJson from '../../package.json'
import Permission, {

} from '../permission'

const MySider = (props) => {
    const [{ global }] = React.useContext(GlobalStore);

    const menus = [
        { label: 'Dashboard', key: '/dashboard', path: '/dashboard', icon: 'bar-chart', permissions: [] },
        { label: 'User', key: '/user', path: '/user', icon: 'user', permissions: [] },
        {
            label: 'Master', key: '/none', path: '/none', icon: 'form', children: [
                { label: 'Agama', key: '/religion', path: '/religion', icon: 'snippets', permissions: [] },
            ], permissions: []
        },
    ]

    const buildMenuItem = (arr) => {
        return arr.filter(v => Permission.hasOneOf(v.permissions)).map(menu => {
            if (Array.isArray(menu.children)) {
                return <Menu.SubMenu key={menu.key}
                    title={<span><Icon type={menu.icon} /><span className="nav-text">{menu.label}</span></span>}>
                    {buildMenuItem(menu.children)}
                </Menu.SubMenu>
            }
            return (<Menu.Item key={menu.key}>
                <MyLink to={menu.path}>
                    <Icon type={menu.icon} />
                    <span className="nav-text">{menu.label}</span>
                </MyLink>
            </Menu.Item>
            )
        })
    }

    const iof = props.location.pathname.indexOf('/', 1);
    const path = iof > 0 ? props.location.pathname.substring(0, iof) : props.location.pathname

    return (
        <div>
            <Layout.Sider style={{
                overflowY: 'auto', height: '100%', backgroundColor: 'white',
            }} width={250} collapsible collapsed={global.collapse} trigger={null}
            >
                <div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={[path]}>
                        {buildMenuItem(menus)}
                    </Menu>
                </div>
                <div style={{ height: 20 }}></div>
            </Layout.Sider>
            <div style={{
                width: global.collapse ? 80 : 250, textAlign: 'center', fontSize: 10, backgroundColor: 'OliveDrab',
                color: 'white', padding: '5px 0px 5px 0px', position: 'absolute',
                bottom: 0, left: 0
            }}>{packageJson.version}</div>
        </div>
    );
};

export default MySider;