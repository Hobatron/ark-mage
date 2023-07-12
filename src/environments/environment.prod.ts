import { Secrets } from './secrets';

export const environment = {
	production: true,
	github: new Secrets().gitHub,
};
