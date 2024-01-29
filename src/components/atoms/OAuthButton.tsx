import clsx from 'clsx';
import React from 'react';

import facebookLogo from '../../assets/facebook.svg';
import githubLogo from '../../assets/github.svg';
import googleLogo from '../../assets/google.svg';

interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: 'google' | 'github' | 'facebook';
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ mode }) => {
  if (mode === 'google') {
    return (
      // <LoginSocialGoogle onResolve={onResolve} onReject={onReject} discoveryDocs="claims_supported"
      //     access_type="offline" client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""} redirect_uri='' scope='openid profile email' >
      // </LoginSocialGoogle>
      <Button
        className=""
        onClick={(e) => {
          e.preventDefault();
          // refetch();
          // if (data) {
          //     window.location.assign(data.url)

          // }
          window.location.assign(import.meta.env.VITE_BACKEND_URL + '/auth/oauth-request');
        }}
      >
        <img src={googleLogo} alt="" className="w-6" />
      </Button>
    );
  } else if (mode === 'github') {
    return (
      // <LoginSocialFacebook onResolve={onResolve} onReject={onReject} appId='647190444109037' redirect_uri='https://localhost:5173/' fieldsProfile={
      //     "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
      // }>
      // </LoginSocialFacebook>
      <Button
        className=""
        onClick={(e) => {
          e.preventDefault();
          window.location.assign(import.meta.env.VITE_BACKEND_URL + '/auth/oauth-request-github');
        }}
      >
        <img src={githubLogo} alt="" className="w-6" />
      </Button>
    );
  } else {
    return (
      // <LoginSocialGithub onResolve={onResolve} onReject={onReject} client_id='233f209318986dd7ee4c' redirect_uri='' client_secret='f2702b40a1f4f7ca0077cee6ad5f1f0ca5c73293'>
      // </LoginSocialGithub>
      <Button
        className=""
        onClick={(e) => {
          e.preventDefault();
          window.location.assign(import.meta.env.VITE_BACKEND_URL + '/auth/oauth-request-facebook');
        }}
      >
        <img src={facebookLogo} alt="" className="w-6" />
      </Button>
    );
  }
};
const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        'p-4 w-20 h-12 flex items-center justify-center bg-transparent border-primary-button-light border-2 border-solid rounded-2xl hover:scale-110 transition ease-in-out duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default OAuthButton;
