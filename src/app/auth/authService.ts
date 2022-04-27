import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  name!: string;
  picture!: string;
  sub!: string;
  roles: string[] = [];

  private _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService, private authService: AuthConfig) {

    this.refreshUserData(undefined);
    this.refresh();
  }

  get isAuthenticated(): boolean {
    return !!this.sub;
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$;
  }

  get isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  async refresh() {
    if (!this.oauthService.discoveryDocumentLoaded) {
      this._isLoading$.next(true);
      await this.oauthService.loadDiscoveryDocument();
      this._isLoading$.next(false);
    }
    if (
      !!this.oauthService.getIdentityClaims() &&
      this.oauthService.hasValidAccessToken()
    ) {
      this.refreshUserData(this.oauthService.getIdentityClaims());
    } else {
      this._isLoading$.next(true);
      await this.oauthService
        .tryLogin()
        .then(async (loginResp) => {
          console.log('loginResp: ', loginResp);
          if (!this.oauthService.hasValidAccessToken()) {
            await this.oauthService.silentRefresh();
          }
        })
        .then(() => {
          this.refreshUserData(this.oauthService.getIdentityClaims());
        })
        .finally(() => this._isLoading$.next(false));
    }
  }

  login() {
    this._isLoading$.next(true);
    this.oauthService.initLoginFlow();
    this.oauthService
      .tryLogin()
      .then(
        (isSuccess) => {
          console.log('Login isSuccess: ', isSuccess);
          if (isSuccess) {
            this.refreshUserData(this.oauthService.getIdentityClaims());
          } else {
            this.refreshUserData(undefined);
          }
        },
        (error) => console.log('Login error: ', error)
      )
      .finally(() => this._isLoading$.next(false));
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.refreshUserData(undefined);
  }

  private refreshUserData(idClaims: any) {
    console.log('refreshUserData: ', idClaims);
    this.name = idClaims?.name || '';
    this.sub = idClaims?.sub || '';
    this.picture = idClaims?.picture || '';
    this.roles = idClaims?.roles || [];
  }

  get idClaims() {
    return this.oauthService.getIdentityClaims();
  }
}
