const BUSINESS_PATH = '/business';
const SUPERUSER_PATH = '/super';
const CLIENT_PATH = '/feed';

export const ACCESS_URL: Record<'worker' | 'admin' | 'customer' | 'superuser', string[]> = {
	worker: [`${BUSINESS_PATH}/*`],
	admin: [`${BUSINESS_PATH}/*`],
	customer: [`${CLIENT_PATH}/*`, '/verification', '/reservations'],
	superuser: [`${SUPERUSER_PATH}/*`],
};

export const MAIN_PAGES: Record<'worker' | 'admin' | 'customer' | 'superuser', string> = {
	worker: `${BUSINESS_PATH}/cars`,
	admin: `${BUSINESS_PATH}/cars`,
	customer: CLIENT_PATH,
	superuser: SUPERUSER_PATH,
};
