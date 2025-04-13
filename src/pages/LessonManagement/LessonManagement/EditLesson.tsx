/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../../api/request";
import { useEffect, useMemo } from "react";
import {
  LESSON_TYPE,
  LESSON_TYPE_MAPPING,
} from "../../../constants/lesson-type";
import Type1Form from "./Type1Form/Type1Form";
import uploadMedia from "../../../utils/uploadMedia";
import Type2Form from "./Type2Form/Type2Form";
import Type3Form from "./Type3Form/Type3Form";
import Type4Form from "./Type4Form/Type4Form";
import Type5Form from "./Type5Form/Type5Form";
import { getLessonById } from "./service";

const EditLesson = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as LESSON_TYPE;

  const { type1, type2, type3, type4, type5 } = useMemo(() => {
    const type1 = [LESSON_TYPE.IMAGE_DESCRIPTION].includes(type);
    const type2 = [LESSON_TYPE.ASK_AND_ANSWER].includes(type);
    const type3 = [
      LESSON_TYPE.CONVERSATION_PIECE,
      LESSON_TYPE.SHORT_TALK,
    ].includes(type);
    const type4 = [LESSON_TYPE.FILL_IN_THE_BLANK_QUESTION].includes(type);
    const type5 = [
      LESSON_TYPE.FILL_IN_THE_PARAGRAPH,
      LESSON_TYPE.READ_AND_UNDERSTAND,
    ].includes(type);

    return { type1, type2, type3, type4, type5 };
  }, [type]);

  const { data } = useQuery({
    queryKey: ["LESSON", id],
    queryFn: () => getLessonById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;

    if (type1) {
      const questions = data.questions.map((it) => ({
        answers: it.answers,
        audio: {
          name: it.audio?.name,
          previewUrl: it.audio?.url,
        },
        image: {
          previewUrl: it.imageUrl,
        },
      }));

      form.setFieldsValue({ questions });
      return;
    }

    if (type2) {
      const questions = data.questions.map((it) => ({
        answers: it.answers,
        audio: {
          name: it.audio?.name,
          previewUrl: it.audio?.url,
        },
      }));

      form.setFieldsValue({ questions });
      return;
    }

    if (type3) {
      const questions = data.questions.map((it) => ({
        questions: it.questions,
        audio: {
          name: it.audio?.name,
          previewUrl: it.audio?.url,
        },
      }));

      form.setFieldsValue({ questions });
      return;
    }

    form.setFieldsValue(data);
  }, [data, form, type1, type2, type3]);

  const updateLessonMutation = useMutation({
    mutationKey: ["UPDATE_LESSON"],
    mutationFn: async (values: any) => {
      let payload: any = {
        type,
        questions: values.questions,
      };

      if (type1) {
        const questions = await Promise.all(
          values.questions.map(async (item: any) => {
            const [audioUrl, imageUrl] = await Promise.all([
              item.audio.file
                ? uploadMedia(item.audio.file.originFileObj)
                : item.audio.previewUrl,
              item.image.file
                ? uploadMedia(item.image.file.originFileObj)
                : item.image.previewUrl,
            ]);

            return {
              answers: item.answers.map((it: any) => ({
                ...it,
                isCorrect: !!it.isCorrect,
              })),
              audio: {
                url: audioUrl,
                name: item.audio.name,
              },
              imageUrl,
            };
          })
        );

        payload = {
          ...payload,
          questions,
        };
      }

      if (type2) {
        const questions = await Promise.all(
          values.questions.map(async (item: any) => {
            const audioUrl = item.audio.file
              ? await uploadMedia(item.audio.file.originFileObj)
              : item.audio.previewUrl;

            return {
              answers: item.answers.map((it: any) => ({
                ...it,
                isCorrect: !!it.isCorrect,
              })),
              audio: {
                name: item.audio.name,
                url: audioUrl,
              },
            };
          })
        );

        payload = {
          ...payload,
          questions,
        };
      }

      if (type3) {
        const questions = await Promise.all(
          values.questions.map(async (item: any) => {
            const audioUrl = item.audio.file
              ? await uploadMedia(item.audio.file.originFileObj)
              : item.audio.previewUrl;

            return {
              questions: item.questions,
              audio: {
                name: item.audio.name,
                url: audioUrl,
              },
            };
          })
        );

        payload = {
          ...payload,
          questions,
        };
      }

      return request.put(`/lessons/${id}`, payload);
    },
    onSuccess: () => {
      message.success("Cập nhật bài học thành công");
      navigate("/lesson");
    },
    onError: () => {
      message.error("Cập nhật bài học thất bại");
    },
  });

  const onSubmit = async (values: any) => {
    updateLessonMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title={`Cập nhật bài học: ${LESSON_TYPE_MAPPING[type]}`}
        renderButton={() => (
          <Link to="/lesson">
            <Button type="primary">Danh sách bài học</Button>
          </Link>
        )}
      />

      <Form
        className="!mt-6"
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          questions: [{}],
        }}
        form={form}
      >
        {type1 && <Type1Form />}
        {type2 && <Type2Form />}
        {type3 && <Type3Form />}
        {type4 && <Type4Form />}
        {type5 && <Type5Form />}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateLessonMutation.isPending}
            disabled={updateLessonMutation.isPending}
          >
            Cập nhật bài học
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditLesson;
