import { InputProps, Input as MuiInput } from '@mui/joy';

import { FunctionComponent } from 'react';

const Input: FunctionComponent<InputProps> = ({ sx = { width: '50%' }, ...props }) => {
  return (
    <MuiInput
      {...props}
      sx={sx}
      endDecorator={props.required ? <div className="text-red-600">*</div> : null}
    />
  );
};

export default Input;
