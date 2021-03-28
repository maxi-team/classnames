const stringify = (mix) => {
  if (typeof mix === 'string') {
    return mix;
  }

  if (typeof mix === 'number') {
    return '' + mix;
  }

  let result = '';
  if (typeof mix === 'object') {
    let sub;
    let part;
    let key;

    if (Array.isArray(mix)) {
      key = mix.length;
      while (key--) {
        if (part = mix[key]) {
          if (sub = stringify(part)) {
            result += (result && ' ') + sub;
          }
        }
      }

      return result;
    }

    for (key in mix) {
      if (mix[key]) {
        result += (result && ' ') + key;
      }
    }
  }

  return result;
};

export function classNames() {
  let result = '';
  let sub;
  let part;

  let i = arguments.length;
  while (i--) {
    if (part = arguments[i]) {
      if (sub = stringify(part)) {
        result += (result && ' ') + sub;
      }
    }
  }

  return result;
}
