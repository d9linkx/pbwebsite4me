export interface PreRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface PreRegisterResponse {
  message: string;
  data: {
    rowNumber: number;
    email: string;
    timestamp: string;
  };
}
