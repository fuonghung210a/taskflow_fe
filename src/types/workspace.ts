export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

export interface CreateWorkspaceRequest {
  name: string;
  ownerId: string;
  members: string[];
}

export interface CreateWorkspaceResponse {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}
