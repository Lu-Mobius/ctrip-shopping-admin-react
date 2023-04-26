import { Modal, Form, Input, message } from 'antd';
import request from '@/utils/request';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from '@/utils/debounce';

type CommentFormProps = {
    open: boolean;
    onCancel: () => void;
    item: any;
};


function CommentForm(props: CommentFormProps) {
    const [form] = Form.useForm();
    const router = useRouter()
    const handleOk = () => {
        form.submit();
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // 在这里提交评论表单，处理表单数据等等
        submitComment(values, props.item); // 提交表单数据和item参数
        props.onCancel();
    };
    const debouncedonFinish = useDebouncedCallback(onFinish, 500);

    const submitComment = (values: any, item: any) => {
        console.log("🚀 ~ file: index.tsx:9 ~ item:", item)
        const requestBody = {
            ...values, // 将表单数据展开到请求体中
            userId: item.userId, // 添加item参数到请求体中
            hotelId: item.hotelId,
        };
        // 发送POST请求提交评论
        request.post('/api/comment', requestBody).then(async (response) => {
            if (response.success) {
                // 提交成功，提示用户
                message.success('评论成功');
                await router.push(`/hotel/details/?id=${item.hotelId}`);//异步等待跳转结束再定向到评论

            } else {
                // 提交失败，提示用户错误信息
                message.error('评论失败，请稍后再试');
            }
        }).catch((error) => {
            // 发生错误，提示用户
            message.error('评论失败，请稍后再试');
            console.error(error);
        });

    };

    return (
        <Modal
            open={props.open}
            title="评论"
            okText="提交"
            cancelText="取消"
            onCancel={props.onCancel}
            onOk={handleOk}
        >
            <Form form={form} onFinish={debouncedonFinish}>
                <Form.Item
                    label="评论内容"
                    name="comment"
                    rules={[{ required: true, message: '请输入您的评论' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CommentForm;