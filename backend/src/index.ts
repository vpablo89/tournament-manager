import { createApp } from './app/createApp';
import { env } from './config/env';
import { PlayerController } from './controllers/playerController';
import { RegistrationController } from './controllers/registrationController';
import { TournamentController } from './controllers/tournamentController';
import { PlayerPgRepository } from './repositories/playerPgRepository';
import { RegistrationPgRepository } from './repositories/registrationPgRepository';
import { TournamentPgRepository } from './repositories/tournamentPgRepository';
import { PlayerServiceImpl } from './services/playerService';
import { RegistrationServiceImpl } from './services/registrationService';
import { TournamentServiceImpl } from './services/tournamentService';
import { getPool } from './utils/db';
import { ensureSchema } from './utils/ensureSchema';

void (async function bootstrap() {
  const pool = getPool();
  await ensureSchema(pool);

  const tournamentRepo = new TournamentPgRepository(pool);
  const playerRepo = new PlayerPgRepository(pool);
  const registrationRepo = new RegistrationPgRepository(pool);

  const tournamentService = new TournamentServiceImpl(tournamentRepo);
  const playerService = new PlayerServiceImpl(playerRepo, registrationRepo);
  const registrationService = new RegistrationServiceImpl(registrationRepo, playerRepo, tournamentRepo);

  const app = createApp(
    {
      tournamentController: new TournamentController(tournamentService),
      playerController: new PlayerController(playerService),
      registrationController: new RegistrationController(registrationService)
    },
    env.frontendOrigin
  );

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on :${env.port}`);
  });
})();


