import React from 'react';
import { Dropdown, Menu, Icon, Avatar, Badge } from 'antd';
import { GlobalStore } from '../store/store'
import { push, MyLink } from '../component/link'

const ProfileButton = props => {

    const logout = () => {
        localStorage.removeItem('token');
        props.history.replace('/login');
    }

    const handleProfile = () => {
        push(props, '/profile');
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={handleProfile}>
                <Icon type="user" />
                <span>My Profile</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={logout}>
                <Icon type="logout" />
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div style={{ color: 'white', cursor: 'pointer' }}>
                <Avatar size={32} icon="user" />
                <span style={{ marginLeft: '16px' }} >{/*props.global.user === null ? '' : props.global.user.name*/}</span>
                <Icon type="down" style={{ marginLeft: '16px' }} />
            </div>
        </Dropdown>
    );
}

const LayoutHeader = props => {
    const [{ global }, dispatch] = React.useContext(GlobalStore);
    const menuClick = () => {
        dispatch({ type: 'TOGGLE_SIDE_BAR' })
    }
    return (
        <div style={{ margin: '0 16px 0 16px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <span><Icon className="collapse-toggle" type={global.collapse ? "menu-unfold" : "menu-fold"} onClick={menuClick} />
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Desa</span>
                </span>
            </div >
            <div style={{ display: 'flex' }}>
                <div style={{ cursor: 'pointer', fontSize: 20, marginRight: 20 }}>
                    <MyLink to='/notification'>
                        <Badge count={global.notification} style={{ backgroundColor: 'green' }}>
                            <Icon type="notification" style={{ fontSize: 20, color: "white" }} />
                        </Badge>
                    </MyLink>
                </div>
                <ProfileButton {...props} global={global} />
            </div>
        </div >
    );
}

export default LayoutHeader;