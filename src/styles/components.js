import { Tabs } from "antd";

import styled from "@emotion/styled";

//NOTE: [display: "flex"] pode causar problemas no layout
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "stretch")};
  width: ${({ width }) => (width ? width : "100%")};
  padding: var(--sm-pad);
  background: var(--main-white);
`;

export const ContentTabs = styled(Tabs)`
  padding: var(--sm-pad);
  padding-top: 0;

  background: var(--main-white);
`;