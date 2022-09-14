import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;
  invalidError = 'Invalid MongoId';

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(this.invalidError);
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(this.invalidError);
    return this._model.findByIdAndUpdate({ _id, ...obj });
  }
  
  public async delete(_id:string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(this.invalidError);
    return this._model.findByIdAndDelete({ _id });
  }
}
export default MongoModel;