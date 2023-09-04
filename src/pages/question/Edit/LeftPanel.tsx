import { FC } from "react";
import { Tabs } from 'antd';
import Logic from "./Logic";
import QuestionLib from "./QuestionLib";
import MainPoint from "./MainPoint";
import { OrderedListOutlined, BranchesOutlined,FileTextOutlined } from '@ant-design/icons';



interface LeftPanelProps {

}

const LeftPanel: FC<LeftPanelProps> = () => {
    const items = [
        {
            key: 'questionlib',
            label: (
                <span>
                    <OrderedListOutlined />
                    题型
                </span>
            ),
            children: <QuestionLib></QuestionLib>,
        },
        {
            key: 'logic',
            label: (
                <span>
                    <BranchesOutlined />
                    逻辑
                </span>
            ),
            children: <Logic></Logic>,
        },
        {
            key: 'mainpoint',
            label: (
                <span>
                    <FileTextOutlined />
                    大纲
                </span>
            ),
            children: <MainPoint></MainPoint>,
        },
    ];

    return (
        <div>
            <Tabs defaultActiveKey="questionlib" items={items} />
        </div>
    );
}

export default LeftPanel;