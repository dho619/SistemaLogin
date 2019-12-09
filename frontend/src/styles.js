import styled from "styled-components";

export const Div = styled.div`
  background-color: rgba(0,0,0,.1);

  .master {
    min-height: 550px;
    position: relative;
  }
  .Sidebar {
        margin-bottom: -20px;
        margin-top: -20px;
        border-top: 1px solid #000000;
        padding: 0;
        width: 200px;
        background-color: #f1f1f1;
        position: absolute;
        height: 100%;
    }
  .Content {
      margin-left: 200px;
      padding: 1px 16px;
      min-height: 1000px;
  }
`;