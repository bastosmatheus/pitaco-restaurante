class Success<F, S> {
  public readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  public isSuccess(): this is Success<F, S> {
    return true;
  }

  public isFailure(): this is Failure<F, S> {
    return false;
  }
}

class Failure<F, S> {
  public readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  public isFailure(): this is Failure<F, S> {
    return true;
  }

  public isSuccess(): this is Success<F, S> {
    return false;
  }
}

function failure<F, S>(value: F): Either<F, S> {
  return new Failure<F, S>(value);
}

function success<F, S>(value: S): Either<F, S> {
  return new Success<F, S>(value);
}

type Either<F, S> = Failure<F, S> | Success<F, S>;

export { failure, success, Either };
