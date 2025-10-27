import { useState, useMemo } from 'react'

export function usePagination<T>(data: T[] = [], itemsPerPage = 5) {
  const [page, setPage] = useState(1)

  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [page, data, itemsPerPage])

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1))
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setPage(pageNumber)
  }

  return {
    page,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage
  }
}
