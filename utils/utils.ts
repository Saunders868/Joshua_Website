export function convertStringToBoolean(string: string) {
  let boolean;
  if (string == "true") {
    boolean = true;
  } else if (string == "false") {
    boolean = false;
  }

  return boolean;
}
