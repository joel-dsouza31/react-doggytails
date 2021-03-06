import React, { useState, useEffect, useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

import PetCard from '../../components/UI/PetCard/PetCard'
import Heading from '../../components/UI/Heading/Heading'

import classes from './Adopt.module.scss'

const Adopt = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const { url } = useRouteMatch()
  const { userId } = useContext(AuthContext)

  const getPets = async () => {
    try {
      const data = await petService.fetchAllForAdoption()
      setPets(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <>
      <Heading loading={loading}>Adoptions</Heading>
      {!loading &&
        (!pets.length ? (
          <p>
            There are no pets up for adoption now. <br />
            Please come back later.
          </p>
        ) : (
          <div className={classes.grid}>
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                url={url}
                mine={pet.donorUserId === userId}
              />
            ))}
          </div>
        ))}
    </>
  )
}

export default Adopt
