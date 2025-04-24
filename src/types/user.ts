export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export type RegisterInputs = Omit<RegisterFormData, "confirm_password">;

export interface LoginFormData {
  email: string;
  password: string;
  remember_me?: boolean;
}

export type LoginInputs = LoginFormData;
