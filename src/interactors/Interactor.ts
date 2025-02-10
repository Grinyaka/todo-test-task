import { InteractorParams } from './InteractorParams'

export abstract class Interactor<T extends InteractorParams, R> {

  public abstract invoke(params: T): Promise<R>
}
