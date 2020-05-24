import { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

export default interface IInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}
