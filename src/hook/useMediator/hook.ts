import { useEffect, useState } from 'react';

class Mediator<S> {
  private defaultState!: S;

  private state!: S;

  private listeners: Set<Function> = new Set();

  initState(state: S) {
    if (!this.defaultState) {
      this.state = this.defaultState = state;
    }
  }

  getState(): S {
    return this.state;
  }

  setState(newState: Partial<S>): void {
    this.state = { ...this.defaultState, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  resetState() {
    this.state = { ...this.defaultState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

class SingletonMediator<S> extends Mediator<S> {
  private static instance: SingletonMediator<any>;

  private constructor() {
    super();
  }

  public static getInstance<T>(initState: T): SingletonMediator<T> {
    if (!SingletonMediator.instance) {
      SingletonMediator.instance = new SingletonMediator<T>();
    }
    SingletonMediator.instance.initState(initState);
    return SingletonMediator.instance;
  }
}

export const useMediator = <T>(initState: T) => {
  const mediator = SingletonMediator.getInstance<T>(initState);
  const [state, setState] = useState(mediator.getState.bind(mediator));

  useEffect(() => {
    const updateState = (newState: T) => {
      setState(newState);
    };
    return mediator.subscribe(updateState);
  }, []);

  return {
    state,
    setState: mediator.setState.bind(mediator),
  };
};
