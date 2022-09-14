import type {
	Request,
	Response,
} from 'express';
import * as express from 'express';
import {AppDataSource} from '../../data-source';
import {Driver} from '../../entity/driver/Driver';
import {Location} from '../../entity/driver/Location';
import {authenticationToken} from '../../login/login';

const routerDriver = express.Router();
const driverRepository = AppDataSource.getRepository(Driver);
routerDriver.use(authenticationToken);

routerDriver.post(
	'/',
	async (req: Request, resp: Response) => {
		const newDriver = new Driver();
		let location: Location;
		location = req.body.location;
		await AppDataSource.getRepository(Location)
			.save(location)
			.catch(err => {
				console.log('Location was created');
			})
			.catch(err => {
				throw new Error(err);
			},
			);

		newDriver.location = req.body.location;
		newDriver.license = req.body.license;
		newDriver.name = req.body.firstName + req.body.lastName;
		newDriver.email = req.body.email;
		newDriver.dataOfBirth = req.body.dataOfBirth;
		newDriver.classOfDriver = req.body.classOfDriver;
		newDriver.description = req.body.description;

		await AppDataSource.getRepository(Driver)
			.save(newDriver)
			.then(driver => {
				resp.status(200)
					.send(driver);
			})
			.catch(err => resp.status(500)
				.send(err),
			);
	},
);
routerDriver.get(
	'/all/:orderBy',
	async (req: Request, resp: Response) => {
		await AppDataSource.getRepository(Driver)
			.createQueryBuilder('driver')
			.orderBy(
				`driver.${req.params.orderBy || 'name'}`,
			)
			.getMany()
			.then(drivers => {
				resp.status(200)
					.send(drivers);
			})
			.catch(err => {
				resp.status(500)
					.send(err);
			});
	},
);

routerDriver.get(
	'/getOne/:id',
	async (req: Request, resp: Response) => {
		await AppDataSource.getRepository(Driver)
			.findOne({
				where: {
					id: parseInt(req.params.id),
				},
			})
			.then(driver => {
				if (driver) {
					return resp.status(200)
						.send(driver);
				}

				resp.status(404)
					.send('Not found');
			})
			.catch(err => {
				resp.status(500)
					.send(err);
			});
	},
);

routerDriver.put(
	'/:id',
	async (req: Request, resp: Response) => {
		const driverDao = await driverRepository
			.findOne({
				where: {

					id: parseInt(
						req.params.id,
						10,
					),
				},
			})
			.then(driver => {
				driver[Object.keys(req.body)[0].split(':')[0]] = Object.values(req.body)[0];
				void driverRepository.save(driver)
					.then(driver => {
						if (driver) {
							return resp.status(200)
								.send(driver);
						}

						resp.status(404)
							.send('Not found!');
					});
			},
			)
			.catch(err => {
				resp.status(500)
					.send('Not found ');
			});
	},
);
export default routerDriver;
