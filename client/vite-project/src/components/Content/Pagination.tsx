import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useAppDispatch, useAppSelector } from "@/store/storeConfig"
import {selectAllLengths} from '../../store/reducers/employeeSlice'
import { getThunk, setPage, selectPages } from '../../store/reducers/employeeSlice'
import { selectSearch, setState } from '../../store/reducers/searchSlice'

const PaginationComponent = () => {
    const searchObj = useAppSelector(selectSearch)
    const pages = useAppSelector(selectPages)
    const dispatch = useAppDispatch()

    const search = (clickedPage: number) => {
        const payload = {...searchObj, page: clickedPage}
        dispatch(setPage(clickedPage))
        dispatch(getThunk(payload))
    }

    const items = []
    for(let i = 1; i <= pages.allPages; i++) {
        items.push(<PaginationItem key={i} onClick={() => search(i)}>
            <PaginationLink {...(i === pages.currentPage ? { isActive: true } : {})} href="#">{i}</PaginationLink>
        </PaginationItem>)
    }

    return (
        <div className="container">
            <Pagination>
                <PaginationContent>
                    {/* <PaginationItem>
                        <PaginationPrevious />
                    </PaginationItem> */}

                    {items}

                    {/* <PaginationItem>
                        <PaginationNext />
                    </PaginationItem> */}
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationComponent