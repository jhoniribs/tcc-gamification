import React, { useState } from "react";
import axios from "axios";
import { useParams, Redirect, Link } from "react-router-dom";
import { Steps, Button, message, Result } from "antd";
import { useTranslation } from "react-i18next";
import ProjectForm from "components/Project/ProjectForm";
import KanbanBoard from "components/Project/KanbanBoard";
import { observer } from "mobx-react";
import useCurrentUserStore from "stores/CurrentUserStore";
import RepPointsTag from "components/Common/RepPointsTag";

const { Step } = Steps;

const fetcher = axios.create({
  baseURL: "/api",
});

const ProjectStepsView = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  const currentUserStore = useCurrentUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const newProjectReputation = 50;
  const userId = currentUserStore.currentUser.id;
  const newRepPoints =
    currentUserStore.currentUser.reputationPoints + newProjectReputation;

  const steps = [
    {
      key: 1,
      title: "project_steps_view.step_1.title",
      description: "project_steps_view.step_1.description",
      content: (
        <div style={{ width: "50%", marginLeft: "25%" }}>
          <ProjectForm />
        </div>
      ),
    },
    {
      key: 2,
      title: "project_steps_view.step_2.title",
      description: "project_steps_view.step_2.description",
      content: (
        <div style={{ width: "100%", marginLeft: "0" }}>
          <KanbanBoard allowRemoveCard projectId={id} columns={["todo"]} />
        </div>
      ),
    },
    {
      key: 3,
      title: "project_steps_view.step_3.title",
      description: "project_steps_view.step_3.description",
      content: <Result status="success" title="Projeto criado com sucesso!" />,
    },
  ];

  const previous = () => {
    setCurrentStep(currentStep - 1);
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        onChange={(curr) => setCurrentStep(curr)}
        style={{ minHeight: "0%", height: "70px", maxHeight: "70px" }}
      >
        {steps.map((item) => (
          <Step
            key={item.title}
            title={t(item.title)}
            description={t(item.description)}
            style={{ minHeight: "0%" }}
          />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep > 0 && (
          <Button style={{ marginRight: 8 }} onClick={() => previous()}>
            {t("project_steps_view.actions.previous")}
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={async () => {
              await fetcher
                .put(`/user/${userId}/points/${newRepPoints}`)
                .then(() => {
                  let msg = (
                    <span>
                      <span>Você ganhou </span>
                      <RepPointsTag points={newProjectReputation} />
                    </span>
                  );
                  message.info(msg, 3);
                });
            }}
          >
            <Link
              to={(location) => ({
                ...location,
                pathname: "/project/" + id,
              })}
            >
              {t("project_steps_view.actions.start")}
              &nbsp;
              <RepPointsTag points={newProjectReputation} action="plus" />
            </Link>
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {t("project_steps_view.actions.next")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(ProjectStepsView);
