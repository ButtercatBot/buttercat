import { Bot } from './bot';
import { beforeEach, vitest } from 'vitest';
import { Client, client } from 'tmi.js';
import { fromPartial } from '@total-typescript/shoehorn';

vitest.mock('tmi.js');

const clientMock = vi.mocked(client);

suite('Bot', () => {
	beforeEach(() => {
		vi.resetAllMocks();

		clientMock.mockImplementation(() =>
			fromPartial<Client>({
				connect: vi.fn(),
				on: vi.fn(),
			})
		);
	});

	test('no plugins', async () => {
		// arrange
		const bot = buildTestBot();

		// act
		await bot.initialize();

		// assert
		expect(clientMock).toBeCalledTimes(1);
		expect(bot.plugins).toHaveLength(0);
	});

	test('with plugins', async () => {
		// arrange
		const bot = buildTestBot()
			.addPlugin({
				name: 'example plugin 1',
			})
			.addPlugin({
				name: 'example plugin 2',
			});

		// act
		await bot.initialize();

		// assert
		expect(clientMock).toBeCalledTimes(1);
		expect(bot.plugins).toHaveLength(2);
	});

	test('plugin with init method', async () => {
		//arrange
		const initFn = vi.fn();

		const bot = buildTestBot()
			.addPlugin({
				name: 'example plugin 1',
				init: initFn,
			})
			.addPlugin({
				name: 'example plugin 2',
			});

		// act
		await bot.initialize();

		// assert
		expect(clientMock).toBeCalledTimes(1);
		expect(bot.plugins).toHaveLength(2);
		expect(initFn).toBeCalledTimes(1);
	});

	test('one plugin with all message hooks', async () => {
		//arrange
		const onFn = vi.fn();

		clientMock.mockImplementation(() =>
			fromPartial<Client>({
				connect: vi.fn(),
				on: onFn,
			})
		);

		const bot = buildTestBot().addPlugin({
			name: 'example plugin 1',
			onBroadcasterMessage: vi.fn(),
			onModMessage: vi.fn(),
			onSubscriberMessage: vi.fn(),
			onMessage: vi.fn(),
		});

		// act
		await bot.initialize();

		// assert
		expect(clientMock).toBeCalledTimes(1);
		expect(bot.plugins).toHaveLength(1);
		expect(onFn).toHaveBeenCalledTimes(2);
		expect(onFn).toHaveBeenNthCalledWith(1, 'message', expect.any(Function));
		expect(onFn).toHaveBeenNthCalledWith(2, 'connected', expect.any(Function));
	});
});

function buildTestBot() {
	return new Bot({
		channels: ['mychannel'],
		identity: {
			username: 'mybot',
			password: 'pass',
		},
	});
}
