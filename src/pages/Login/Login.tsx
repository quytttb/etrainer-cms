import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { loginService } from "./service";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { onLogin } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      if (data.isAdmin) {
        onLogin({ token: data.token });
      } else {
        message.error("Tài khoản không có quyền truy cập!");
      }
    },
    onError: () => {
      message.error("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
    },
  });

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="font-semibold mb-8 text-2xl">ETrainer CMS</h1>

      <Form
        size="large"
        layout="vertical"
        className="w-96"
        onFinish={loginMutation.mutate}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          disabled={loginMutation.isPending}
          loading={loginMutation.isPending}
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default Login;
