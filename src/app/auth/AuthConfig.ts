import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9900/auth/realms/MyRozvrh',
  redirectUri: 'http://localhost:4200/',
  clientId: 'fe-app',
  scope: 'openid profile email',
  requireHttps: false,
  showDebugInformation: true,
};
