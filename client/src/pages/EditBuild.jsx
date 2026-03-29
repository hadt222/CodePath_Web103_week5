import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BuildForm from '../components/BuildForm'
import PCPreview from '../components/PCPreview'
import { getBuild, updateBuild } from '../services/buildsApi'
import { calculatePrice } from '../utilities/calcPrice'
import { validateBuild } from '../utilities/validation'

const EditBuild = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [build, setBuild] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const loadBuild = async () => {
      try {
        const data = await getBuild(id)
        setBuild({ ...data, rgb: Boolean(data.rgb) })
      } catch (error) {
        setServerError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBuild()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    setServerError('')
    setBuild((currentBuild) => ({
      ...currentBuild,
      [name]: name === 'rgb' ? value === 'true' : value
    }))
  }

  if (isLoading) {
    return (
      <main className='page-stack'>
        <section className='panel'><p>Loading build editor...</p></section>
      </main>
    )
  }

  if (!build) {
    return (
      <main className='page-stack'>
        <section className='panel'><p className='status-error'>{serverError || 'Unable to load build.'}</p></section>
      </main>
    )
  }

  const totalPrice = calculatePrice(build)
  const validationError = validateBuild(build)
  const errorMessage = validationError || serverError

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validationError) {
      return
    }

    try {
      setIsSaving(true)
      await updateBuild(id, { ...build, total_price: totalPrice })
      navigate(`/builds/${id}`)
    } catch (error) {
      setServerError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className='page-layout'>
      <BuildForm
        build={build}
        totalPrice={totalPrice}
        errorMessage={errorMessage}
        submitLabel='Update Build'
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />
      <PCPreview build={build} totalPrice={totalPrice} />
    </main>
  )
}

export default EditBuild
