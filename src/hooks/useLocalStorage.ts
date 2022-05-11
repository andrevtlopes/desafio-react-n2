import { createContext, useMemo, useState } from 'react';

const onList: { type: string; callback: Function }[] = [];
const onAnyList: { callback: Function }[] = [];

interface Storage {
  setItem: Function;
  getItem: Function;
  removeItem: Function;
  clear: Function;
}

interface IContextProps {
  init: (key: string, data: any) => void;
  set: (key: string, data: any) => void;
  get: (key: string) => any;
  remove: (key: string) => void;
  clear: () => void;
  on: (event: string, func: Function) => void;
  onAny: (func: Function) => void;
  off: (event: string, func: Function) => void;
  offAny: (func: Function) => void;
}

/**
 * A hook to allow getting and setting items to storage, hook comes
 * with context and also event listener like functionality
 *
 * @param type either local or session
 *
 * @example
 * const storage = useLocalStorage('session');
 * <StorageContext.Provider value={storage}>...</StorageContext.Provider>
 */
export default function useLocalStorage(type: 'local' | 'session') {
  const [storageType] = useState<Storage>((window as any)[`${type}Storage`]);

  // Prevent rerun on parent redraw
  return useMemo(() => {
    /**
     * Set the data, generally this should be an empty version of the data type
     *
     * @param key key to be used in the storage table
     * @param data data to be passed in to the storage table as the value
     *
     * @example storage.init('table_name', [])
     *
     * @event `init` the key is passed through
     */
    const init = (key: string, data: any) => {
      const type = typeof data;
      if (type === 'object') {
        data = JSON.stringify(data);
      }
      storageType.setItem(key, data);
      storageType.setItem(`$$${key}_data`, type);
      onList
        .filter((obj) => obj.type === 'init')
        .forEach((obj) => obj.callback(key));
      onAnyList.forEach((obj) => obj.callback('init', key));
    };

    /**
     * Set the data, generally you will need to get the data modify it then set it.
     *
     * @param key key to be used in the storage table
     * @param data data to be passed in to the storage table as the value
     *
     * @example storage.set('table_name', ['item1','item2'])
     *
     * @event `set` the key is passed through
     */
    const set = (key: string, data: any) => {
      const type = typeof data;
      if (type === 'object') {
        data = JSON.stringify(data);
      }
      storageType.setItem(key, data);
      storageType.setItem(`$$${key}_data`, type);
      onList
        .filter((obj) => obj.type === 'set')
        .forEach((obj) => obj.callback(key));
      onAnyList.forEach((obj) => obj.callback('set', key));
    };

    /**
     * Get the data.
     *
     * @param key key to be fetched from the storage table
     *
     * @example const tableName = storage.get('table_name');
     *
     * @event `get` the key is passed through
     *
     * @returns contents of selected key
     */
    const get = (key: string) => {
      const type = storageType.getItem(`$$${key}_data`);
      const data = storageType.getItem(key);

      onList
        .filter((obj) => obj.type === 'get')
        .forEach((obj) => obj.callback(key));
      onAnyList.forEach((obj) => obj.callback('get', key));

      switch (type) {
        case 'object':
          return JSON.parse(data);
        case 'number':
          return parseFloat(data);
        case 'boolean':
          return data === 'true';
        case 'undefined':
          return undefined;
        default:
          return data;
      }
    };

    /**
     * Remove a specific key and its contents.
     *
     * @param key key to be cleared from the storage table
     *
     * @example storage.remove('table_name');
     *
     * @event `remove` the key is passed through
     */
    const remove = (key: string) => {
      storageType.removeItem(key);
      storageType.removeItem(`$$${key}_data`);
      onList
        .filter((obj) => obj.type === 'remove')
        .forEach((obj) => obj.callback(key));
      onAnyList.forEach((obj) => obj.callback('remove', key));
    };

    /**
     * Remove all items from storage
     *
     * @example storage.clear();
     *
     * @event `clear` the key is passed through
     */
    const clear = () => {
      storageType.clear();
      onList
        .filter((obj) => obj.type === 'clear')
        .forEach((obj) => obj.callback());
      onAnyList.forEach((obj) => obj.callback('clear'));
    };

    /**
     * Add event listener for when this component is used.
     *
     * @param event name of event triggered by function
     * @param func a callback function to be called when event matches
     *
     * @example storage.on('set', (key) => {
     *   const data = storage.get(key);
     *   console.log(data)
     * })
     */
    const on = (event: string, func: Function) => {
      onList.push({ type: event, callback: func });
    };

    /**
     * Add event listener, for all events, for when this component is used.
     *
     * @param func a callback function to be called when any event is triggered
     *
     * @example storage.onAny((key) => {
     *   const data = storage.get(key);
     *   console.log(data)
     * })
     */
    const onAny = (func: Function) => {
      onAnyList.push({ callback: func });
    };

    /**
     * If you exactly match an `on` event you can remove it
     *
     * @param event matching event name
     * @param func matching function
     */
    const off = (event: string, func: Function) => {
      const remove = onList.indexOf(
        onList.filter((e) => e.type === event && e.callback === func)[0]
      );
      if (remove >= 0) onList.splice(remove, 1);
    };

    /**
     * If you exactly match an `onAny` function you can remove it
     *
     * @param func matching function
     */
    const offAny = (func: Function) => {
      const remove = onAnyList.indexOf(
        onAnyList.filter((e) => e.callback === func)[0]
      );
      if (remove >= 0) onAnyList.splice(remove, 1);
    };

    return { init, set, get, remove, clear, on, onAny, off, offAny };
  }, [storageType]);
}

export const StorageContext = createContext({} as IContextProps);
