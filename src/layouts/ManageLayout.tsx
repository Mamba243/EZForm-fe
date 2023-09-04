import React, { FC } from 'react'
import { Space, Button, Divider, message, Dropdown } from 'antd'
import { useDispatch } from 'react-redux'
import type { MenuProps } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { DeleteOutlined, PlusOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { addEmptyQuestionService } from '../services/question'
import styles from './ManageLayout.module.scss'
import { removeToken } from '../utils/user-token'
import { logoutReducer } from '../store/userReducer'

interface ManageLayoutProps {

}

const ManageLayout: FC<ManageLayoutProps> = () => {
    const nav = useNavigate()
    const { pathname } = useLocation()
    const dispatch = useDispatch()

    const {
        loading,
        // error,
        run: handleCreateClick,
    } = useRequest(addEmptyQuestionService, {
        manual: true,
        onSuccess(result) {
            nav(`/question/edit/${result.id}`)
            message.success('创建成功')
        },
    })

    function logout() {
        dispatch(logoutReducer()) // 清空了 redux user 数据
        removeToken() // 清除 token 的存储
        message.success('退出成功')
        nav('/')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button type='link' onClick={logout} >退出</Button>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction="vertical">
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={handleCreateClick}
                    >
                        新建问卷
                    </Button>
                    <Divider />
                    <Button
                        type='text'
                        size="large"
                        icon={<UserOutlined />}
                        onClick={() => nav('/manage/my')}
                        className={pathname.startsWith('/my') ? styles.selected_tab : ''}

                    >
                        我的问卷
                    </Button>
                    <Button
                        type='text'
                        size="large"
                        icon={<CopyOutlined />}
                        onClick={() => nav('/manage/template')}
                        className={pathname.startsWith('/template') ? styles.selected_tab : ''}
                    >
                        问卷模板
                    </Button>
                    <Button
                        type='text'
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => nav('/manage/trash')}
                        className={pathname.startsWith('/trash') ? styles.selected_tab : ''}
                    >
                        回收站
                    </Button>
                </Space>
                <Dropdown menu={{ items }} placement="top">
                    <img src={require('../assets/logo.png')} alt="avatar" className={styles.avatar} />
                </Dropdown>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    );
}

export default ManageLayout;