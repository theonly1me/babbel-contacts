/**
 * @module ContactsModel
 * The MVC Model for Contacts
 */

/* developer modules */
import type { Contact } from '../types/index.js';
import { getEmailFilter } from '../utils/index.js';
import contacts from './contacts.mongo.js';

const model = {
  /**
   * Finds and returns a single contact
   *
   * @param name - name of the contact
   * @param domain - domain of the contact's organization
   */
  async findOneContact(name: string, domain: string) {
    return contacts
      .findOne({ name, email: { $regex: getEmailFilter(domain) } })
      .exec();
  },

  /**
   * Creates a new contact
   *
   * @param data - the contact data
   * @param data.name - the name of the contact
   * @param data.email - the email of the contact
   */
  async createContact(data: Contact) {
    return await contacts.create(data);
  },

  /**
   * Retrieves the details of an existing contact who's email domain matches the current domain specified
   *
   * @param domain - the domain of the contact's organization
   */
  async findExistingContact(domain: string) {
    return contacts.findOne({
      email: { $regex: getEmailFilter(domain) },
    });
  },
};

export default model;
