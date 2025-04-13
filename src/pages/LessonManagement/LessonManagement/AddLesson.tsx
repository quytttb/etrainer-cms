/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Button, Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import request from "../../../api/request";
import { useMemo } from "react";
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

const AddLesson = () => {
  const navigate = useNavigate();

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

  const addLessonMutation = useMutation({
    mutationKey: ["ADD_LESSON"],
    mutationFn: async (values: any) => {
      let payload: any = {
        type,
        questions: values.questions,
      };

      if (type1) {
        const questions = await Promise.all(
          values.questions.map(async (item: any) => {
            const [audioUrl, imageUrl] = await Promise.all([
              uploadMedia(item.audio.file.originFileObj),
              uploadMedia(item.image.file.originFileObj),
            ]);

            return {
              answers: item.answers.map((it: any) => ({
                ...it,
                isCorrect: !!it.isCorrect,
              })),
              audio: {
                name: item.audio.file.name,
                url: audioUrl,
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
            const audioUrl = await uploadMedia(item.audio.file.originFileObj);

            return {
              answers: item.answers.map((it: any) => ({
                ...it,
                isCorrect: !!it.isCorrect,
              })),
              audio: {
                name: item.audio.file.name,
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
            const audioUrl = await uploadMedia(item.audio.file.originFileObj);

            return {
              questions: item.questions,
              audio: {
                name: item.audio.file.name,
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

      return request.post("/lessons", payload);
    },
    onSuccess: () => {
      message.success("Thêm bài học thành công");
      navigate("/lesson");
    },
    onError: () => {
      message.error("Thêm bài học thất bại");
    },
  });

  const onSubmit = async (values: any) => {
    addLessonMutation.mutate(values);
  };

  return (
    <>
      <PageTitle
        title={`Thêm bài học: ${LESSON_TYPE_MAPPING[type]}`}
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
            loading={addLessonMutation.isPending}
            disabled={addLessonMutation.isPending}
          >
            Thêm bài học
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddLesson;
