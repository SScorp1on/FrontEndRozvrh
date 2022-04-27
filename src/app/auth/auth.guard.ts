import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {filter, Observable, switchMap, tap} from "rxjs";
import {AuthService} from "./auth.service";


export class AuthGuard {
  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || this.authService.login(state.url)),
    );
  }
}