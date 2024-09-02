import React, { useEffect } from 'react';
import SignIn from '../../pages/Authentication/SignIn';

interface SignInModalProps {
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Trap focus within the modal
  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = e.currentTarget;
    const firstFocusableElement = modal.querySelectorAll(
      focusableElements,
    )[0] as HTMLElement;
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[
      focusableContent.length - 1
    ] as HTMLElement;

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // If Shift + Tab is pressed
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // If Tab is pressed
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onKeyDown={trapFocus}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
        style={{ top: '550%', maxWidth: '1000px' }}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInModal;
