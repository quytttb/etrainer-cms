/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import request from "../../api/request";
import { useMemo } from "react";
import { LESSON_TYPE, LESSON_TYPE_MAPPING } from "../../constants/lesson-type";
import Type1Form from "./Type1Form/Type1Form";
import uploadMedia from "../../utils/uploadMedia";
import Type2Form from "./Type2Form/Type2Form";
import Type3Form from "./Type3Form/Type3Form";
import Type4Form from "./Type4Form/Type4Form";
import Type5Form from "./Type5Form/Type5Form";
import Type6Form from "./Type6Form/Type6Form";

const AddQuestion = () => {
  const navigate = useNavigate();

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

  const addQuestionMutation = useMutation({
    mutationKey: ["ADD_QUESTION"],
    mutationFn: async (values: any) => {
      let payload: any = {
        type,
      };

      if (type1) {
        const [audioUrl, imageUrl] = await Promise.all([
          uploadMedia(values.audio.file.originFileObj),
          uploadMedia(values.image.file.originFileObj),
        ]);

        payload = {
          ...payload,
          answers: values.answers.map((it: any) => ({
            ...it,
            isCorrect: !!it.isCorrect,
          })),
          audio: {
            name: values.audio.file.name,
            url: audioUrl,
          },
          imageUrl,
        };
      }

      if (type2) {
        const audioUrl = await uploadMedia(values.audio.file.originFileObj);

        payload = {
          ...payload,
          answers: values.answers.map((it: any) => ({
            ...it,
            isCorrect: !!it.isCorrect,
          })),
          audio: {
            name: values.audio.file.name,
            url: audioUrl,
          },
        };
      }

      if (type3) {
        const audioUrl = await uploadMedia(values.audio.file.originFileObj);

        payload = {
          ...payload,
          questions: values.questions,
          audio: {
            name: values.audio.file.name,
            url: audioUrl,
          },
        };
      }

      if (type6) {
        const imageUrl = await uploadMedia(values.image.file.originFileObj);

        payload = {
          ...payload,
          ...values,
          imageUrl,
        };
      }

      payload = {
        ...payload,
        ...values,
      };

      return request.post("/question", payload);
    },
    onSuccess: () => {
      message.success("Thêm câu hỏi thành công");
      navigate(-1);
    },
    onError: () => {
      message.error("Thêm câu hỏi thất bại");
    },
  });

  const onSubmit = (values: any) => {
    addQuestionMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title={`Thêm câu hỏi: ${LESSON_TYPE_MAPPING[type]}`}
        renderButton={() => (
          <Link to="/questions">
            <Button type="primary">Danh sách câu hỏi</Button>
          </Link>
        )}
      />

      <Form className="!mt-6" layout="vertical" onFinish={onSubmit}>
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
            loading={addQuestionMutation.isPending}
            disabled={addQuestionMutation.isPending}
          >
            Thêm câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddQuestion;
