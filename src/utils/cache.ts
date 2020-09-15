import { identity } from "lodash";
import { invokeProp } from "./fp";

export class LocalCache<T> {
  private deserialize: (x: string) => T;
  private serialize: (x: T) => string;
  constructor(deserialize?: (x: string) => T, serialize?: (x: T) => string) {
    this.deserialize = deserialize || JSON.parse;
    this.serialize = serialize || JSON.stringify;
  }

  public set(name: string, data: T) {
    const x = this.serialize(data);
    localStorage.setItem(name, x);
  }

  public async get(name: string): Promise<T | undefined> {
    const got = localStorage.getItem(name);
    if (got) {
      return this.deserialize(got);
    }

    return undefined;
  }

  public async delete(name: string): Promise<void> {
    return localStorage.removeItem(name);
  }
}

const cache = new LocalCache<string>(identity, identity);
export async function cachedFetch(url: string) {
  // try the cache first
  const thingOrNot = await cache.get(url);
  if (thingOrNot) return thingOrNot;

  // otherwise hit the url and cache the result
  const thing = await fetch(url).then(invokeProp('text'));
  cache.set(url, thing);

  return thing;
}
