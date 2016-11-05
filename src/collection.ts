const _arrayFromMap: {(m: Map<any, any>, getValues: boolean): any[]} = (function() {
  try {
    if ((<any>(new Map()).values()).next) {
      return function createArrayFromMap(m: Map<any, any>, getValues: boolean): any[] {
        return getValues ? (<any>Array).from(m.values()) : (<any>Array).from(m.keys());
      };
    }
  } catch (e) {
  }
  return function createArrayFromMapWithForeach(m: Map<any, any>, getValues: boolean): any[] {
    let res = new Array(m.size), i = 0;
    m.forEach((v, k) => {
      res[i] = getValues ? v : k;
      i++;
    });
    return res;
  };
})();

export class MapWrapper {
  static createFromStringMap<T>(stringMap: {[key: string]: T}): Map<string, T> {
    let result = new Map<string, T>();
    for (let prop in stringMap) {
      result.set(prop, stringMap[prop]);
    }
    return result;
  }
  static keys<K>(m: Map<K, any>): K[] { return _arrayFromMap(m, false); }
  static values<V>(m: Map<any, V>): V[] { return _arrayFromMap(m, true); }
}