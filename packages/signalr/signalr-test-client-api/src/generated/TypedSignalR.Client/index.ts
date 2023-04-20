/* THIS (.ts) FILE IS GENERATED BY TypedSignalR.Client.TypeScript */
/* eslint-disable */
/* tslint:disable */
import { HubConnection, IStreamResult, Subject } from '@microsoft/signalr';
import { IChatHub, ITimeStreamHub, IChatReceiver } from './TestSignalr.Interfaces';
import { ClientItem, Message } from '../TestSignalr.Interfaces';


// components

export type Disposable = {
    dispose(): void;
}

export type HubProxyFactory<T> = {
    createHubProxy(connection: HubConnection): T;
}

export type ReceiverRegister<T> = {
    register(connection: HubConnection, receiver: T): Disposable;
}

type ReceiverMethod = {
    methodName: string,
    method: (...args: any[]) => void
}

class ReceiverMethodSubscription implements Disposable {

    public constructor(
        private connection: HubConnection,
        private receiverMethod: ReceiverMethod[]) {
    }

    public readonly dispose = () => {
        for (const it of this.receiverMethod) {
            this.connection.off(it.methodName, it.method);
        }
    }
}

// API

export type HubProxyFactoryProvider = {
    (hubType: "IChatHub"): HubProxyFactory<IChatHub>;
    (hubType: "ITimeStreamHub"): HubProxyFactory<ITimeStreamHub>;
}

export const getHubProxyFactory = ((hubType: string) => {
    if(hubType === "IChatHub") {
        return IChatHub_HubProxyFactory.Instance;
    }
    if(hubType === "ITimeStreamHub") {
        return ITimeStreamHub_HubProxyFactory.Instance;
    }
}) as HubProxyFactoryProvider;

export type ReceiverRegisterProvider = {
    (receiverType: "IChatReceiver"): ReceiverRegister<IChatReceiver>;
}

export const getReceiverRegister = ((receiverType: string) => {
    if(receiverType === "IChatReceiver") {
        return IChatReceiver_Binder.Instance;
    }
}) as ReceiverRegisterProvider;

// HubProxy

class IChatHub_HubProxyFactory implements HubProxyFactory<IChatHub> {
    public static Instance = new IChatHub_HubProxyFactory();

    private constructor() {
    }

    public readonly createHubProxy = (connection: HubConnection): IChatHub => {
        return new IChatHub_HubProxy(connection);
    }
}

class IChatHub_HubProxy implements IChatHub {

    public constructor(private connection: HubConnection) {
    }

    public readonly join = async (username: string): Promise<void> => {
        return await this.connection.invoke("Join", username);
    }

    public readonly leave = async (): Promise<void> => {
        return await this.connection.invoke("Leave");
    }

    public readonly getParticipants = async (): Promise<string[]> => {
        return await this.connection.invoke("GetParticipants");
    }

    public readonly sendMessage = async (message: string): Promise<void> => {
        return await this.connection.invoke("SendMessage", message);
    }

    public readonly alwaysThrows = async (): Promise<void> => {
        return await this.connection.invoke("AlwaysThrows");
    }
}

class ITimeStreamHub_HubProxyFactory implements HubProxyFactory<ITimeStreamHub> {
    public static Instance = new ITimeStreamHub_HubProxyFactory();

    private constructor() {
    }

    public readonly createHubProxy = (connection: HubConnection): ITimeStreamHub => {
        return new ITimeStreamHub_HubProxy(connection);
    }
}

class ITimeStreamHub_HubProxy implements ITimeStreamHub {

    public constructor(private connection: HubConnection) {
    }

    public readonly streamTimeAsync = (intervalSeconds: number): IStreamResult<(Date | string)> => {
        return this.connection.stream("StreamTimeAsync", intervalSeconds);
    }

    public readonly clientToServerStreaming = async (stream: Subject<ClientItem>): Promise<void> => {
        return await this.connection.send("ClientToServerStreaming", stream);
    }

    public readonly getUploaded = async (): Promise<string[]> => {
        return await this.connection.invoke("GetUploaded");
    }

    public readonly alwaysErrors = (): IStreamResult<string> => {
        return this.connection.stream("AlwaysErrors");
    }

    public readonly alwaysErrorsOnTheSecondEmit = (): IStreamResult<string> => {
        return this.connection.stream("AlwaysErrorsOnTheSecondEmit");
    }
}


// Receiver

class IChatReceiver_Binder implements ReceiverRegister<IChatReceiver> {

    public static Instance = new IChatReceiver_Binder();

    private constructor() {
    }

    public readonly register = (connection: HubConnection, receiver: IChatReceiver): Disposable => {

        const __onReceiveMessage = (...args: [Message]) => receiver.onReceiveMessage(...args);
        const __onLeave = (...args: [string, (Date | string)]) => receiver.onLeave(...args);
        const __onJoin = (...args: [string, (Date | string)]) => receiver.onJoin(...args);

        connection.on("OnReceiveMessage", __onReceiveMessage);
        connection.on("OnLeave", __onLeave);
        connection.on("OnJoin", __onJoin);

        const methodList: ReceiverMethod[] = [
            { methodName: "OnReceiveMessage", method: __onReceiveMessage },
            { methodName: "OnLeave", method: __onLeave },
            { methodName: "OnJoin", method: __onJoin }
        ]

        return new ReceiverMethodSubscription(connection, methodList);
    }
}

