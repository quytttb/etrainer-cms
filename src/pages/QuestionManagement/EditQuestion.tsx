/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../api/request";
import { useEffect, useMemo } from "react";
import { LESSON_TYPE, LESSON_TYPE_MAPPING } from "../../constants/lesson-type";
import Type1Form from "./Type1Form/Type1Form";
import uploadMedia from "../../utils/uploadMedia";
import Type2Form from "./Type2Form/Type2Form";
import Type3Form from "./Type3Form/Type3Form";
import Type4Form from "./Type4Form/Type4Form";
import Type5Form from "./Type5Form/Type5Form";
import { getQuestionById } from "./service";
import Type6Form from "./Type6Form/Type6Form";

const EditQuestion = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as LESSON_TYPE;

  const { type1, type2, type3, type4, type5, type6 } = useMemo(() => {
    const type1 = [LESSON_TYPE.IMAGE_DESCRIPTION].includes(type);
    const type2 = [LESSON_TYPE.ASK_AND_ANSWER].includes(type);
    const type3 = [
      LESSON_TYPE.CONVERSATION_PIECE,
      LESSON_TYPE.SHORT_TALK,
    ].includes(type);
    const type4 = [LESSON_TYPE.FILL_IN_THE_BLANK_QUESTION].includes(type);
    const type5 = [LESSON_TYPE.FILL_IN_THE_PARAGRAPH].includes(type);
    const type6 = [LESSON_TYPE.READ_AND_UNDERSTAND].includes(type);

    return { type1, type2, type3, type4, type5, type6 };
  }, [type]);

  const { data } = useQuery({
    queryKey: ["QUESTION", id],
    queryFn: () => getQuestionById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;

    if (type1) {
      form.setFieldsValue({
        answers: data.answers,
        audio: {
          name: data.audio?.name,
          previewUrl: data.audio?.url,
        },
        image: {
          previewUrl: data.imageUrl,
        },
        explanation: data.explanation,
        subtitle: data.subtitle,
      });
      return;
    }

    if (type2) {
      form.setFieldsValue({
        answers: data.answers,
        audio: {
          name: data.audio?.name,
          previewUrl: data.audio?.url,
        },
        explanation: data.explanation,
        subtitle: data.subtitle,
      });
      return;
    }

    if (type3) {
      form.setFieldsValue({
        questions: data.questions,
        audio: {
          name: data.audio?.name,
          previewUrl: data.audio?.url,
        },
        explanation: data.explanation,
      });
      return;
    }

    if (type6) {
      form.setFieldsValue({
        ...data,
        image: {
          previewUrl: data.imageUrl,
        },
        subtitle: data.subtitle,
      });
      return;
    }

    form.setFieldsValue(data);
  }, [data, form, type1, type2, type3, type6]);

  const updateQuestionMutation = useMutation({
    mutationKey: ["UPDATE_QUESTION"],
    mutationFn: async (values: any) => {
      let payload: any = {
        type,
        ...values,
        questions: values.questions,
      };

      if (type1) {
        const [audioUrl, imageUrl] = await Promise.all([
          values.audio.file
            ? uploadMedia(values.audio.file.originFileObj)
            : values.audio.previewUrl,
          values.image.file
            ? uploadMedia(values.image.file.originFileObj)
            : values.image.previewUrl,
        ]);

        payload = {
          ...payload,
          answers: values.answers.map((it: any) => ({
            ...it,
            isCorrect: !!it.isCorrect,
          })),
          audio: {
            url: audioUrl,
            name: values.audio.name,
          },
          imageUrl,
        };
        console.log("🚀 TDS ~ mutationFn: ~ payload:", payload);
      }

      if (type2) {
        const audioUrl = values.audio.file
          ? await uploadMedia(values.audio.file.originFileObj)
          : values.audio.previewUrl;

        payload = {
          ...payload,
          answers: values.answers.map((it: any) => ({
            ...it,
            isCorrect: !!it.isCorrect,
          })),
          audio: {
            name: values.audio.name,
            url: audioUrl,
          },
        };
      }

      if (type3) {
        const audioUrl = values.audio.file
          ? await uploadMedia(values.audio.file.originFileObj)
          : values.audio.previewUrl;

        payload = {
          ...payload,
          questions: values.questions,
          audio: {
            name: values.audio.name,
            url: audioUrl,
          },
        };
      }

      if (type6) {
        const imageUrl = values.image.file
          ? await uploadMedia(values.image.file.originFileObj)
          : values.image.previewUrl;

        payload = {
          ...payload,
          ...values,
          imageUrl,
        };
      }

      return request.put(`/question/${id}`, payload);
    },
    onSuccess: () => {
      message.success("Cập nhật câu hỏi thành công");
      navigate(-1);
    },
    onError: () => {
      message.error("Cập nhật câu hỏi thất bại");
    },
  });

  const onSubmit = async (values: any) => {
    updateQuestionMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title={`Cập nhật câu hỏi: ${LESSON_TYPE_MAPPING[type]}`}
        renderButton={() => (
          <Link to="/questions">
            <Button type="primary">Danh sách bài học</Button>
          </Link>
        )}
      />

      <Form className="!mt-6" layout="vertical" onFinish={onSubmit} form={form}>
        {type1 && <Type1Form />}
        {type2 && <Type2Form />}
        {type3 && <Type3Form />}
        {type4 && <Type4Form />}
        {type5 && <Type5Form />}
        {type6 && <Type6Form />}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateQuestionMutation.isPending}
            disabled={updateQuestionMutation.isPending}
          >
            Cập nhật câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditQuestion;
