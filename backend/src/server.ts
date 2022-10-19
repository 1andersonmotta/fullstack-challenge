import ExpressAdapter from './infra/adapter/ExpressAdapter';
import { ConfigEnv } from './infra/config/configuration';
import UserController from './infra/controller/UserController';

const PORT = ConfigEnv.server.port || 3000;

export const expressAdapter = new ExpressAdapter();

const app = expressAdapter.app

new UserController(expressAdapter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});