export interface MySmartBlindsConfig {
    username?: string;
    password?: string;
    closeUp?: boolean;
    allowDebug?: boolean;
    statusLog?: boolean;
}

export interface MySmartBlindsBlind {
    name: string;
    encodedMacAddress: string;
    encodedPasskey: string;
    roomId: number;
    deleted: boolean;
}
