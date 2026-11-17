export interface CreateClientRequestBody {
  requestText: string;
}

export interface ClientRequest extends CreateClientRequestBody {
  requestId: number;
  projectId: number;
  createdAt: string;
}

export type CreateClientRequestData =
  | ClientRequest
  | (Omit<ClientRequest, 'requestId'> & { id: number });
