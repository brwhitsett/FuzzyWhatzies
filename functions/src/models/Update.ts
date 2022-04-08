interface UpdateObj {
  eC?: number;
  eI?: number;
  eT?: number;
  mC?: number;
  mI?: number;
  mT?: number;
  hC?: number;
  hI?: number;
  hT?: number;
  iC?: number;
  iI?: number;
  iT?: number;
  tT?: number;
  tC?: number;
  tI?: number;
}

export default interface Update {
  $inc: UpdateObj;
}
