/**
 * @module HealthController
 * Health check controller
 */

import type { Request, Response } from 'express';

export function knockknock(req: Request, res: Response) {
  return res.status(200).send("who's there?");
}
