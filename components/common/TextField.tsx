import styled from "@emotion/styled";
import { TextField as MaterialTextField } from "@mui/material";

const TextField = styled(MaterialTextField)`
  width: 100%;
  input {
    color: white;
  }
  label {
    color: #999999;
  }

  div {
    border: 1px solid whitesmoke;
  }
`;

export default TextField;
