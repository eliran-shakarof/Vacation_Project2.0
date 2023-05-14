export type WithCallback <T, S = void, F = void> = T & {
    successCallback?: (data: S) => void;
    failureCallback?: (data: F) => void;
}


