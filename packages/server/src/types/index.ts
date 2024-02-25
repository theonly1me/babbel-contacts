export interface Contact {
  name: string;
  email: string;
  domain?: string;
}

export type ContactRequestType = {
  name: string;
  domain: string;
  onboard?: boolean;
};
