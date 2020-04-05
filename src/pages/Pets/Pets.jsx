import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import petService from '../../http/pet'
import PetCard from '../../components/UI/PetCard/PetCard'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const { url } = useRouteMatch()

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
      <h3>Adopt {loading && <Spinner animation='grow' />}</h3>
      {!loading &&
        (!pets.length ? (
          <p>
            There are no pets up for adoption now. <br />
            Please come back later.
          </p>
        ) : (
          <section className='pet-grid'>
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} url={url} />
            ))}
          </section>
        ))}
    </>
  )
}

export default Pets
