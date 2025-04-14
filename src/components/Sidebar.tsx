// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import {Menu, Avatar} from 'antd';
import {UserOutlined, HomeOutlined} from '@ant-design/icons'; // 添加所需的图标
import {Link} from 'react-router-dom';
import '../styles/Sidebar.css'; // 引入 Sidebar.css

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar"> {/* 使用 sidebar 类名 */}
            <div className="sidebar-header"> {/* 添加 sidebar-header 类名 */}
                <HomeOutlined style={{fontSize: '24px', color: '#fff'}}/> {/* 添加图标 */}
            </div>
            <Menu className="menu" mode="inline" theme="light" defaultSelectedKeys={['1']}>
                {/*<div className="options">*/}
                {/*    <Menu.Item key="1">*/}
                {/*        <Link to="/dest">目的地管理</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="2">*/}
                {/*        <Link to="/box">包装箱管理</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="3">*/}
                {/*        <Link to="/cargo">标准件管理</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="4">*/}
                {/*        <Link to="/plan">装箱方案生成</Link>*/}
                {/*    </Menu.Item>*/}
                {/*</div>*/}
                {/*<div className="settings">*/}
                {/*    <Menu.Item key="5">*/}
                {/*        <Link to="/settings">设置</Link>*/}
                {/*    </Menu.Item>*/}
                {/*</div>*/}

                <Menu.Item key="1">
                    <Link to="/dest">目的地管理</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/box">包装箱管理</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/cargo">标准件管理</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/plan">装箱方案生成</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/settings">设置</Link>
                </Menu.Item>

            </Menu>
            <div className="avatar">
                <Avatar size={40} icon={<UserOutlined/>}/>
            </div>
        </div>
    );
};

export default Sidebar;
