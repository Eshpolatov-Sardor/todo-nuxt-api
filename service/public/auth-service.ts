import type { AbortablePromise } from "simple-abortable-promise"
import httpClient from "@/service/public/http-client"
import { LOGIN, REGISTER } from "@/service/public/endpoinds"

export interface RegisterPayload {
  username: string
  first_name: string
  last_name: string
  password: string
}
export type LoginPayload = Pick<RegisterPayload, "username" | "password">

class AuthService {
  url: string
  constructor() {
    this.url = (REGISTER.endsWith("/")) ? REGISTER : `${REGISTER}/`
  }

  register(payload: RegisterPayload): AbortablePromise<any> {
    return httpClient.post(REGISTER, payload)
  }

  login(payload: LoginPayload): AbortablePromise<any> {
    console.log(payload);
    
    return httpClient.post(LOGIN, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }
}

export default new AuthService()
