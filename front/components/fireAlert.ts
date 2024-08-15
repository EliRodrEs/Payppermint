import Swal from 'sweetalert2';

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

interface FireAlertOptions {
  title?: string;
  text?: string;
  icon?: AlertIcon;
  toast?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  iconColor?: string;
}

const getAlertColor = (iconType: AlertIcon): string => {
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue(`--${iconType}-color`).trim();
};

const ALERT_COLORS: Record<AlertIcon, string> = {
  info: getAlertColor('info'),
  success: getAlertColor('success'),
  error: getAlertColor('error'),
  warning: getAlertColor('warning'),
  question: getAlertColor('question'),
};

export function fireAlert({
  title = '',
  text = '',
  icon = 'info',
  toast = true,
  confirmButtonText = 'Aceptar',
  cancelButtonText = 'Cancelar',
  showCancelButton = true,
  showConfirmButton = true,
  timer = 0,
  timerProgressBar = false,
  position = 'center',
  iconColor,
}: FireAlertOptions = {}) {
  return Swal.fire({
    title,
    text,
    icon,
    toast,
    iconColor: iconColor || ALERT_COLORS[icon],
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    timer,
    timerProgressBar,
    position,
  });
}
