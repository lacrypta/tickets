import React from "react";
import { Checkbox, FormControlLabel, FormGroup, Link } from "@mui/material";

interface ITermsCheckboxProps {
  checked: boolean;
  disabled: boolean;
  onChange: (_e: any, _v: any) => void;
}

const TermsCheckbox = ({
  checked,
  disabled,
  onChange,
}: ITermsCheckboxProps) => (
  <FormGroup>
    <FormControlLabel
      disabled={disabled}
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={
        <div>
          Acepto darle permiso a mis Peronios al contrato{" "}
          <Link
            href={
              "https://polygonscan.com/address/" +
              process.env.NEXT_PUBLIC_GATEWAY_CONTRACT
            }
            underline='hover'
          >
            <a>Gateway</a>
          </Link>
        </div>
      }
    />
  </FormGroup>
);

export default TermsCheckbox;
