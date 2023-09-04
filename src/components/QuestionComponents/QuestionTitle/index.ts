import Component from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import { DefaultQuestionTitleProps } from './interface'

export * from './interface'

// Title 组件的配置
const QuestionTitleConf = {
    title: '标题',
    type: 'questionTitle',
    Component,
    FormComponent,
    PropsComponent,
    defaultProps: DefaultQuestionTitleProps
}
export default QuestionTitleConf