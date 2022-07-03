export interface GenericServiceInterface<T> {
    create(data: Partial<T>): Promise<T>;

    update(data: Partial<T>): Promise<T>;

    delete(id: number): void;

    get(id: number): Promise<T | null>;

    getRepo();

    build(data: Partial<T>): T;
}
