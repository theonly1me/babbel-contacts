import { expect } from 'chai';
import { getEmailFilter } from '../../utils/index.js';

describe('Utils', () => {
  describe('getEmailFilter', () => {
    it('should return the correct email filter for a given domain', () => {
      const domain = 'example.com';
      const expectedFilter = '@example.com.*';

      const result = getEmailFilter(domain);

      expect(result).to.equal(expectedFilter);
    });
  });
});
