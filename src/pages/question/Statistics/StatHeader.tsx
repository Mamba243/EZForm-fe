import React, { FC, useState, useRef, useEffect } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, Tooltip, Popover, Space, Typography, message } from 'antd'
import { QrcodeOutlined, CopyOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
import { PUB_PATH } from '../../../router/index'

const { Title } = Typography

interface StatHeaderProps {

}

const StatHeader: FC<StatHeaderProps> = () => {
    const nav = useNavigate()
    const { id = '' } = useParams()
    const [url, setUrl] = useState('')
    const urlInputRef = useRef<InputRef>(null)

    function copy() {
        const elem = urlInputRef.current
        if (elem == null) return
        elem.select() // 选中 input 的内容
        document.execCommand('copy') // 拷贝选中内容 （富文本编辑器的操作）
        message.success('拷贝成功')
    }

    useEffect(() => {
        setUrl(`${PUB_PATH}/${id}`)
    }, [id])

    return (
        <div className={styles.header}>
            <Space>
                <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
                <Tooltip title="拷贝链接">
                    <Button icon={<CopyOutlined />} onClick={copy}></Button>
                </Tooltip>
                <Popover content={
                    <div style={{ textAlign: 'center' }}>
                        <QRCode value={url} size={150} />
                    </div>
                }>
                    <Button icon={<QrcodeOutlined />}></Button>
                </Popover>
            </Space>
            <Button onClick={() => nav(-1)}>返回</Button>
        </div>
    );
}

export default StatHeader;
