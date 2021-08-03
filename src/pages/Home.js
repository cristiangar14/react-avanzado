import React from 'react'
import { ListOfCategories } from '../components/listOfCategories'
import { ListOfPhotoCards } from '../container/listOfPhotoCards'

export const Home = ({ categoryId }) => {
  return (
    <>
      <ListOfCategories />
      <ListOfPhotoCards categoryId={categoryId} />
    </>
  )
}
