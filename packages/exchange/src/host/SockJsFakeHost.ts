import colors from 'colors';
import http from 'http';
import { AddressInfo } from 'net';
import sockjs, { Connection as InboundConnection, Server } from 'sockjs';
import Url from 'url';
import { ProtocolHandler } from '../ProtocolHandler';
import { BaseFakeHost, Connection } from './BaseFakeHost';

export class SockJsFakeHost extends BaseFakeHost {
    private echo!: Server;
    private server!: http.Server;
    private serverPort?: number;
    private connections = new Map<string, InboundConnection>();

    constructor(
        protocolHandler: ProtocolHandler<unknown, unknown>,
        port?: number,
        private path: string = '/ws',
    ) {
        super(protocolHandler);
        this.start(port);
    }

    public start(port?: number) {
        if (this.server && this.server.listening) {
            console.warn('Server already running.');
            return;
        }
        this.echo = sockjs.createServer();
        this.echo.on('connection', this.onLocalConnection.bind(this));
        this.server = http.createServer();
        this.server.listen(port || 0, undefined, async () => {
            this.serverPort = (this.server.address() as AddressInfo).port;
            console.info(colors.green(`Started SockJSFakeHost on ${await this.url}`));
        });
        this.echo.installHandlers(this.server, { prefix: this.path });
    }

    private onLocalConnection(connection: InboundConnection) {
        if (!connection) {
            return;
        }
        this.connections.set(connection.id, connection);

        const url = Url.parse(connection.url, true);

        const payload: Connection = {
            id: connection.id,
            query: url.query,
            close: () => {
                connection.close();
                connection.destroy();
            },
            write: (raw: string) => {
                connection.write(raw);
            },
        };

        this.onConnection(payload);
        connection.on('data', (raw: string) => {
            this.onMessage(payload, raw);
        });
        connection.on('close', () => {
            this.onClose(connection.id);
            this.connections.delete(connection.id);
        });
    }

    get url(): Promise<string> {
        return this.port.then(port => {
            return `http://127.0.0.1:${port}${this.path}`;
        });
    }

    private get port(): Promise<number> {
        // When the port is set with 0, it will startup on a free port
        // We only get this port once the service has started.
        return new Promise(resolve => {
            const intervalId = setInterval(() => {
                if (this.serverPort) {
                    clearInterval(intervalId);
                    resolve(this.serverPort);
                }
            }, 1);
        });
    }

    async dispose(): Promise<void> {
        this.disconnect();
        return new Promise((resolve, reject) => {
            this.server.close(err => {
                return err ? reject() : resolve();
            });
        });
    }

    disconnect() {
        this.connections.forEach((connection: InboundConnection) => {
            connection.close();
            connection.destroy();
        });
    }
}