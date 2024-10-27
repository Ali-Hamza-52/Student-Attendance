import { toast, ToastOptions, ToastContent } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

const useToast = () => {
  const showToast = (
    type: ToastType,
    message: ToastContent,
    options?: ToastOptions
  ) => {
    const mergedOptions = { ...defaultOptions, ...options };

    switch (type) {
      case 'success':
        toast.success(message, mergedOptions);
        break;
      case 'error':
        toast.error(message, mergedOptions);
        break;
      case 'info':
        toast.info(message, mergedOptions);
        break;
      case 'warning':
        toast.warning(message, mergedOptions);
        break;
      default:
        toast(message, mergedOptions);
    }
  };

  const showSuccess = (message: ToastContent, options?: ToastOptions) =>
    showToast('success', message, options);

  const showError = (message: ToastContent, options?: ToastOptions) =>
    showToast('error', message, options);

  const showInfo = (message: ToastContent, options?: ToastOptions) =>
    showToast('info', message, options);

  const showWarning = (message: ToastContent, options?: ToastOptions) =>
    showToast('warning', message, options);

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
};

export default useToast;
