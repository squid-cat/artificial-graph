export type IGetPrefList = {
  message: string
  result: IPref[]
}

export type IGetPrefArtificialList = {
  message: string
  result: {
    boundaryYear: number
    data: IPrefArtificial[]
  }
}

export type IPref = {
  prefCode: number
  prefName: string
}

export type IPrefArtificial = {
  label: string
  data: { year: number; value: number; rate: number }[]
}
