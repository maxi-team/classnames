type ClassValue = string | number | null | boolean | undefined;
type ClassNames = Array<ClassValue | Record<string, ClassValue>>;

export declare const classNames: (...classes: ClassNames[]) => string;
