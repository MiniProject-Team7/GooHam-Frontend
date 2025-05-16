export interface PageRequestParams {
  page?: number
  size?: number
  sortField?: string
  sortOrder?: "asc" | "desc"
}

export interface PageRequest {
  page: number
  size: number
  sortField: string
  sortOrder: "asc" | "desc"
}


export const buildPageRequest = ({
  page = 0,
  size = 10,
  sortField = "",
  sortOrder = "asc",
}: PageRequestParams): PageRequest => ({
  page,
  size,
  sortField,
  sortOrder,
})