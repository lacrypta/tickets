import styled from "@emotion/styled";
import { FormControl } from "@mui/material";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

export const MainForm = () => {
  return (
    <Container>
      <FormControl>Main Form</FormControl>
    </Container>
  );
};
