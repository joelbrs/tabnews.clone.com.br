export class EntityNotFoundException extends Error {
  constructor(entity: string) {
    super(`${entity} not found!`);
    this.name = "EntityNotFoundException";
  }
}
