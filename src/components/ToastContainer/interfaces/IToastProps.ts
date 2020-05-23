import { IToastMessage } from '~/hooks/ToastContext';

export default interface IToastProps {
  toast: IToastMessage;
  style: object;
}
