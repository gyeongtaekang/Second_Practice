// authService.d.ts
declare module '../../util/auth/authService' {
    export function tryLogin(email: string, password: string, saveToken?: boolean): Promise<any>;
    export function tryRegister(email: string, password: string): Promise<void>;
  }
  