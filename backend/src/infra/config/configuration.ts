import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export const ConfigEnv = {
	server: {
		port: process.env.SERVER_PORT,
	},
	version: packageJson.version || '1.0.0',
};

