export type ContactForm = {
  name: string;
  domain: string;
  email?: string;
  errors?: {
    name?: string;
    domain?: string;
    onboard?: string;
  };
};
