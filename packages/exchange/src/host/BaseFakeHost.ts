import { Url } from 'url'
import { ProtocolHandler } from '../ProtocolHandler'

export type Localhost = {
    port: number
    path?: string
}

export type NewHostOptions = {
    protocolHandler: ProtocolHandler<unknown, unknown> | ProtocolHandler<unknown, unknown>[]
    name: string
    debug: boolean
    url: Url | Localhost // url on InlineFakeHost, vs port/path on WsFakeHost
    httpServer: unknown
}

export interface HostOptions {
    name?: string
    debug?: boolean
}

export type ConnectionId = string & { __connectionId: never }
export interface Connection {
    close: () => void
    readonly id: ConnectionId
    write: (message: string) => void
    isClosed?: boolean
    query?: Record<string, string | string[] | undefined>
}

export interface FakeHost {
    readonly url: Promise<string>
    dispose: () => Promise<void>
    disconnect: () => void
    getConnections: () => Connection[]
    start: (port?: number) => void
    refuseNewConnections: boolean
}

export abstract class BaseFakeHost implements FakeHost {
    private readonly _connections = new Array<Connection>()

    constructor(public readonly protocolHandler: ProtocolHandler<unknown, unknown>) {}

    protected onConnection(connection: Connection) {
        this._connections.unshift({
            ...connection,
            isClosed: false,
        })
        if (this.protocolHandler.onConnection != null) {
            this.protocolHandler.onConnection(connection)
        }
    }

    public getConnections() {
        return this._connections
    }

    refuseNewConnections = false

    abstract get url(): Promise<string>

    abstract dispose(): Promise<void>

    protected onClose(id: ConnectionId) {
        this._connections.forEach(x => {
            if (x.id === id) {
                x.isClosed = true
                this.protocolHandler.onDisconnection && this.protocolHandler.onDisconnection(x)
            }
        })
    }

    abstract disconnect(): void

    abstract start(): void

    protected onMessage(connection: Connection, raw: string | Buffer) {
        const message = this.protocolHandler.deserialize(raw)
        this.protocolHandler.onMessage(connection, message)
    }
}
