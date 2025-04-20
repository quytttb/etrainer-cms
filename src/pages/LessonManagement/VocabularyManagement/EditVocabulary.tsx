/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getVocabularyById, IVocabulary } from "./service";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../../api/request";
import { useEffect } from "react";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import UploadFormItem from "../../../components/UploadFormItem/UploadFormItem";
import uploadMedia from "../../../utils/uploadMedia";

const EditVocabulary = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["VOCABULARY", id],
    queryFn: () => getVocabularyById(id as string),
    enabled: !!id,
  });

  const editVocabularyMutation = useMutation({
    mutationKey: ["EDIT_VOCABULARY"],
    mutationFn: async (values: any) => {
      const { words, ...rest } = values;

      const newWords = await Promise.all(
        words.map(async (it: any) => {
          const audioUrl = it.audio?.file
            ? await uploadMedia(it.audio.file.originFileObj)
            : it.audio.previewUrl;

          return {
            ...it,
            audio: {
              url: audioUrl,
              name: it.audio.name,
            },
          };
        })
      );

      return request.put(`/vocabulary/${id}`, {
        ...rest,
        words: newWords,
      });
    },
    onSuccess: () => {
      message.success("Cập nhật từ vựng thành công");
      navigate("/vocabulary");
    },
    onError: () => {
      message.error("Cập nhật từ vựng thất bại");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        topicName: data.topicName,
        words: data.words.map((word) => ({
          word: word.word,
          meaning: word.meaning,
          pronunciation: word.pronunciation,
          audio: {
            previewUrl: word.audio.url,
            name: word.audio.name,
          },
        })),
      });
    }
  }, [data, form]);

  const onSubmit = (values: IVocabulary) => {
    editVocabularyMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title="Cập nhật từ vựng"
        renderButton={() => (
          <Link to="/vocabulary">
            <Button type="primary">Danh sách từ vựng</Button>
          </Link>
        )}
      />

      <Form
        className="!mt-6"
        layout="vertical"
        initialValues={{ words: [{}] }}
        onFinish={onSubmit}
        form={form}
      >
        <FormWrapper>
          <Form.Item
            label="Tên chủ đề"
            name="topicName"
            rules={[{ required: true, message: "Vui lòng nhập tên chủ đề" }]}
          >
            <Input placeholder="Nhập tên chủ đề" />
          </Form.Item>

          <Form.List name="words">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="grid grid-cols-12 gap-4">
                    <Form.Item
                      {...restField}
                      name={[name, "word"]}
                      label="Từ vựng"
                      rules={[
                        { required: true, message: "Vui lòng nhập từ vựng" },
                      ]}
                      rootClassName="col-span-3"
                    >
                      <Input placeholder="Nhập từ vựng" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "meaning"]}
                      label="Nghĩa"
                      rules={[
                        { required: true, message: "Vui lòng nhập nghĩa" },
                      ]}
                      rootClassName="col-span-3"
                    >
                      <Input placeholder="Nhập nghĩa" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "pronunciation"]}
                      label="Cách phát âm"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập cách phát âm",
                        },
                      ]}
                      rootClassName="col-span-3"
                    >
                      <Input placeholder="Nhập cách phát âm" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "audio"]}
                      label="Audio"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn file audio",
                        },
                      ]}
                      rootClassName="col-span-2"
                    >
                      <UploadFormItem accept="audio/*" />
                    </Form.Item>

                    {fields.length > 1 && (
                      <div className="flex">
                        <DeleteOutlined onClick={() => remove(name)} />
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className="mb-6"
                >
                  Thêm từ vựng
                </Button>
              </>
            )}
          </Form.List>
        </FormWrapper>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={editVocabularyMutation.isPending}
            disabled={editVocabularyMutation.isPending}
          >
            Cập nhật từ vựng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditVocabulary;
