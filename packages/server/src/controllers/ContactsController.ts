/**
 * @module ContactsController
 * Controller containing action methods for handling the details of the contacts
 */
/* external dependencies */
import type { Request, Response } from 'express';

/* developer modules */
import type { ContactRequestType } from '../types/index.js';

import contactsModel from '../models/ContactsModel.js';

export async function getOrCreateContactDetails(req: Request, res: Response) {
  const { name, domain, onboard }: ContactRequestType = req.body;

  try {
    if (!name || !name.length || name.split(' ').length < 2) {
      throw new Error(
        "The name specified is invalid. Name should be in the format: 'Firstname Lastname'."
      );
    }

    if (
      !domain ||
      !domain.length ||
      domain.split('.').length < 2 ||
      domain.includes('@')
    ) {
      throw new Error(
        "The domain specified is invalid. Domain should be in the format: 'domain.TLD'."
      );
    }

    if (typeof onboard !== 'undefined' && typeof onboard !== 'boolean') {
      throw new Error(
        "The onboard flag is invalid. The onboard flag must be one of 'true' or 'false' and will be ignored if user's organization is already onboarded."
      );
    }

    const titleCaseName = name
      .toLowerCase()
      .split(' ')
      .map(n => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');

    console.log('THE TITLE CASE NAME IS', titleCaseName);

    let contact = await contactsModel.findOneContact(titleCaseName, domain);

    let statusCode = 200;

    if (!contact) {
      let email: string;

      const existingContact = await contactsModel.findExistingContact(domain);

      if (existingContact) {
        const format = existingContact.email.split('@')[0];
        const lowerName = existingContact.name.toLowerCase();
        const isInitialFormatting = format.includes(lowerName.split(' ')[0])
          ? false
          : true;

        email =
          (isInitialFormatting
            ? lowerName[0] + lowerName.split(' ')[1]
            : `${name.toLowerCase().split(' ').join('')}`) + `@${domain}`;
      } else {
        if (!onboard) {
          throw new Error(
            "Organization not onboarded. Please send the onboard flag as 'true' to onboard organization and add contact."
          );
        }

        email = `${titleCaseName.toLowerCase().split(' ').join('')}@${domain}`;
      }

      contact = await contactsModel.createContact({
        name: titleCaseName,
        email,
      });
      statusCode = 201;
    }

    return res.status(statusCode).json({
      name: contact.name,
      email: contact.email,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      const [title, detail] = e.message.split('. ');

      console.log('The title is', title);
      return res.status(400).json({
        title,
        detail,
        type: 'BAD_REQUEST',
        status: 400,
      });
    }
  }
}
