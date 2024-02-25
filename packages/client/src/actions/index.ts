'use server';

import { ContactForm } from '@/types';
import { title } from 'process';
import { z } from 'zod';

const contactSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, {
      message:
        "Must be first name and last name separated by a single space. Eg: 'Atchyut Pulavarthi'",
    })
    .min(6),
  domain: z
    .string()
    .regex(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/, {
      message:
        "Must be of domain and top level domain separated by a single dot. Eg: 'atchyut.dev'",
    })
    .min(2),
});

export async function findOrCreateContact(
  formState: ContactForm,
  formData: FormData
): Promise<ContactForm> {
  const name = String(formData.get('name'));
  const domain = String(formData.get('domain'));
  const onboard = formData.get('onboard') === 'on';

  const result = contactSchema.safeParse({
    name,
    domain,
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      name,
      domain,
      errors: {
        name: fieldErrors.name ? fieldErrors.name.join(', ') : '',
        domain: fieldErrors.domain ? fieldErrors.domain.join(', ') : '',
      },
    };
  } else {
    if (
      process.env.SERVER_URL &&
      process.env.USERNAME &&
      process.env.PASSWORD
    ) {
      const headers = {
        Authorization: `Basic ${Buffer.from(
          `${process.env.USERNAME}:${process.env.PASSWORD}`,
          'binary'
        ).toString('base64')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const body = {
        name,
        domain,
        onboard,
      };

      const rawResponse = await fetch(`${process.env.SERVER_URL}/contacts`, {
        headers,
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await rawResponse.json();

      if (data.type === 'BAD_REQUEST') {
        return {
          name,
          domain,
          errors: {
            onboard: title,
          },
        };
      } else {
        return {
          name,
          domain,
          email: data.email,
        };
      }
    }
    return { name, domain };
  }
}
