import React, { useState } from "react";
import { Typography } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

import * as Styled from "./styled";
import { FlexDiv } from "styles/components";
import { useLocalStore } from "mobx-react";
import useCurrentUserStore from "stores/CurrentUserStore";
import RepPointsTag from "components/Common/RepPointsTag";

const { Title, Text } = Typography;

const fetcher = axios.create({
  baseURL: "/api",
});

const ProjectForm = () => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();
  const [redirectId, setRedirectId] = useState(null);

  const formState = useLocalStore(() => ({
    title: {
      value: "",
      error: null,
      dirty: false,
    },
    description: {
      value: "",
      error: null,
      dirty: false,
    },
    deadline: {
      value: null,
      error: null,
      dirty: false,
    },
  }));

  const createProject = async () => {
    await fetcher
      .post("/project", {
        title: formState.title.value,
        description: formState.description.value,
        leader_id: currentUserStore.currentUser.id,
        team_id: 0,
        status: "open",
        deadline: formState.deadline.value,
      })
      .then(({ data }) => {
        console.table(data);
        if (data.id) {
          setRedirectId(data.id);
        }
      })
      .catch((err) => console.error);
  };

  return (
    <>
      {redirectId === null ? (
        <>
          <Title level={3} style={{ marginLeft: "20%", marginBottom: "25px" }}>
            {t("project_form.title")}
            <span style={{ marginLeft: 10 }}>
              <RepPointsTag
                points={40}
                action="plus"
                style={{ fontSize: 14 }}
              />
            </span>
          </Title>
          <Styled.ProjectInput
            size="large"
            placeholder={t("project_form.inputs.title")}
            formState={formState}
            name="title"
          />
          <Styled.ProjectInput
            size="large"
            placeholder={t("project_form.inputs.description")}
            formState={formState}
            name="description"
          />
          <Styled.ProjectDatePicker
            size="large"
            placeholder={t("project_form.inputs.deadline")}
            formState={formState}
            name="deadline"
          />

          {/* {formState.title.value} */}
          {/* {formState.description.value} */}
          {/* {formState.deadline.value?.format()} */}
          <FlexDiv justifyContent={"flex-end"}>
            <Text
              strong
              style={{
                fontSize: 20,
                marginRight: 10,
                marginTop: 4,
              }}
            >
              {t("project_form.create_button")}
            </Text>

            <Styled.CreateProjectButton
              type="primary"
              shape="round"
              icon="arrow-right"
              size={"large"}
              onClick={createProject}
            />
          </FlexDiv>
        </>
      ) : (
        <Redirect to={`/edit/project/${redirectId}`} />
      )}
    </>
  );
};

export default ProjectForm;
