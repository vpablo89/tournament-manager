import { Router } from 'express';
import { PlayerController } from '../controllers/playerController';
import { RegistrationController } from '../controllers/registrationController';
import { TournamentController } from '../controllers/tournamentController';

export type Controllers = {
  tournamentController: TournamentController;
  playerController: PlayerController;
  registrationController: RegistrationController;
};

export function createRoutes(controllers: Controllers): Router {
  const router = Router();

  router.post('/tournaments', controllers.tournamentController.create);
  router.get('/tournaments', controllers.tournamentController.list);
  router.get('/tournaments/:id/standings', controllers.registrationController.standings);

  router.post('/players', controllers.playerController.create);
  router.put('/players/:id', controllers.playerController.update);
  router.get('/players', controllers.playerController.list);
  router.get('/players/ranking', controllers.playerController.ranking);

  router.post('/registrations', controllers.registrationController.create);
  router.get('/registrations', controllers.registrationController.list);

  router.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  return router;
}
