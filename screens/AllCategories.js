import { useContext, useEffect, useState } from 'react'

import { CategoriesContext } from '../store/categories-context'
import CategoriesOutput from '../components/CategoriesOutput/CategoriesOutput'
import { fetchCategories } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const AllCategories = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const categoriesCtx = useContext(CategoriesContext)

  useEffect(() => {
    const getCategories = async () => {
      setIsFetching(true)
      try {
        const categories = await fetchCategories()
        categoriesCtx.setCategories(categories)
      } catch (error) {
        setError('Could not fetch categories!')
      }
      setIsFetching(false)
    }

    getCategories()
  }, [])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return <CategoriesOutput categories={categoriesCtx.categories} />
}

export default AllCategories
