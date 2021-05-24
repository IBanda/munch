import {
  Loader,
  LoaderThemeColor,
  LoaderType,
} from '@progress/kendo-react-indicators';

interface Props {
  type?: LoaderType;
  theme?: LoaderThemeColor;
  wrapperClassName?: string;
}

export default function AppLoader({
  type = 'converging-spinner',
  theme = 'primary',
  wrapperClassName = '',
}: Props) {
  return (
    <div
      data-testid="loader"
      className={`d-flex justify-content-center ${wrapperClassName}`}
    >
      <Loader type={type} themeColor={theme} />
    </div>
  );
}
