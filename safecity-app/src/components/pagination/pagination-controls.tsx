'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationControlsProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const visiblePages = 5

  const half = Math.floor(visiblePages / 2)
  let startPage = Math.max(1, page - half)
  const endPage = Math.min(totalPages, startPage + visiblePages - 1)

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <Pagination className='mt-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              if (page > 1) onPageChange(page - 1)
            }}
          />
        </PaginationItem>

        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(1)
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationEllipsis />}
          </>
        )}

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={page === pageNumber}
              onClick={(e) => {
                e.preventDefault()
                onPageChange(pageNumber)
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(totalPages)
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              if (page < totalPages) onPageChange(page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
