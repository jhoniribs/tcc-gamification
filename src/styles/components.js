import { Tabs } from "antd";

import styled from "@emotion/styled";

//NOTE: [display: "flex"] pode causar problemas no layout
export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "stretch"};
  width: ${({ width }) => (width ? width : "100%")};

  border: ${({ cardStyle }) => (cardStyle ? "1px solid #e8e8e8" : "0")};
  padding: ${({ cardStyle, padding }) =>
    padding ? padding : cardStyle ? "36px" : "var(--sm-pad)"};
`;
// background: var(--main-white);

export const ContentTabs = styled(Tabs)`
  padding: var(--xs-pad);
  padding-top: 0;

  background: var(--main-white);
`;
