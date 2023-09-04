import { FC, useState } from "react"
import { message, Table, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import type { ColumnsType } from 'antd/es/table'
import useLoadStatRowData from "../../../hooks/useLoadStatRowData"
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import GetTitleByFeId from '../../../utils/GetTitleByFeId'
import { statRawDeleteService } from '../../../services/question'
const { confirm } = Modal

// 固定列
const fixedColumns: ColumnsType<any> = [
    {
        title: '序号',
        render: (text, record, index) => `${index + 1}`,
        fixed: 'left',
    },
    {
        title: '提交人',
        dataIndex: 'submitName',
        key: 'submitName',
        width: 150,
        fixed: 'left',
    },
    {
        title: '问卷得分',
        dataIndex: 'questionScore',
        key: 'questionScore',
        width: 150,
    },
    {
        title: '开始时间',
        dataIndex: 'answerTime',
        key: 'answerTime',
        width: 150,
    },
    {
        title: '结束时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
        width: 150,
    },
    {
        title: '答题时长(秒)',
        dataIndex: 'answerSeconds',
        key: 'answerSeconds',
        width: 150,
    },
    {
        title: 'IP地址',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
        width: 150,
    },
    {
        title: '设备类型',
        dataIndex: 'deviceType',
        key: 'deviceType',
        width: 150,
    },
    {
        title: '平台类型',
        dataIndex: 'platformType',
        key: 'platformType',
        width: 150,
    },
    {
        title: 'Browser',
        dataIndex: 'browser',
        key: 'browser',
        width: 150,
    }
];

const ListPanel: FC = () => {
    const { componentList } = useGetComponentInfo()
    const { loading, data = {}, refresh } = useLoadStatRowData()
    const { list, total } = data

    let columns: any[] = []; // 初始化 columns 数组
    let dataSource: any[] = []; // 初始化 dataSource 数组

    if (Array.isArray(list)) {
        // 将用户输入数据加入dataSource
        dataSource = list.map(item => {
            const newItem = { ...item};
            if (item.children && Array.isArray(item.children)) {
                item.children.forEach((child: any) => {
                    newItem[child.fe_id] = child.value;
                });
            }
            return newItem;
        });

        // 动态生成的列
        const dynamicColumns: ColumnsType<any> = list[0]?.children?.map((child: any) => {
            return {
                title: GetTitleByFeId(child.fe_id, componentList),
                dataIndex: child.fe_id,
                key: child.fe_id,
                width: 200,
            };
        }) || [];


        columns = [...fixedColumns, ...dynamicColumns, {
            title: '操作',
            key: 'action',
            width: 50,
            fixed: 'right',
            render: (text: any, record: any) => (
                <div style={{ display: 'flex' }}>
                    <Button type='link' onClick={() => { del(record.id) }}>删除</Button>
                </div>
            ),
        }];
    }

    // 删除
    const { run: deleteQuestion } = useRequest(
        async (id: string) => await statRawDeleteService(id),
        {
            manual: true,
            onSuccess() {
                message.success('删除成功')
                refresh()
            },
        }
    )

    function del(id: string) {
        confirm({
            title: '确认彻底删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            content: '删除以后不可以找回',
            onOk: () => deleteQuestion(id),
        })
    }

    return (
        <Table columns={columns} dataSource={dataSource} rowKey="_id" scroll={{ x: 'max-content' }} />
    );
}

export default ListPanel;