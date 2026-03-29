import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuildForm from '../components/BuildForm'
import PCPreview from '../components/PCPreview'
import PrebuiltGallery from '../components/PrebuiltGallery'
import { DEFAULT_BUILD } from '../data/buildOptions'
import { createBuild } from '../services/buildsApi'
import { calculatePrice } from '../utilities/calcPrice'
import { validateBuild } from '../utilities/validation'

const CreateBuild = () => {
  const navigate = useNavigate()
  const [build, setBuild] = useState(DEFAULT_BUILD)
  const [isSaving, setIsSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  const totalPrice = calculatePrice(build)
  const validationError = validateBuild(build)
  const errorMessage = validationError || serverError

  const handleChange = (event) => {
    const { name, value } = event.target

    setServerError('')
    setBuild((currentBuild) => ({
      ...currentBuild,
      [name]: name === 'rgb' ? value === 'true' : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validationError) {
      return
    }

    try {
      setIsSaving(true)
      const savedBuild = await createBuild({ ...build, total_price: totalPrice })
      navigate(`/builds/${savedBuild.id}`)
    } catch (error) {
      setServerError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLoadPrebuilt = (prebuilt) => {
    setServerError('')
    setBuild({
      build_name: prebuilt.build_name,
      case_color: prebuilt.case_color,
      cpu: prebuilt.cpu,
      gpu: prebuilt.gpu,
      ram: prebuilt.ram,
      storage: prebuilt.storage,
      cooling: prebuilt.cooling,
      rgb: prebuilt.rgb
    })

    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const buildNameInput = formRef.current?.querySelector('#build_name')
      buildNameInput?.focus()
      buildNameInput?.select()
    })
  }

  return (
    <main className='page-stack'>
      <PrebuiltGallery activeBuildName={build.build_name} onLoadPrebuilt={handleLoadPrebuilt} />

      <section className='page-layout'>
        <BuildForm
          build={build}
          totalPrice={totalPrice}
          errorMessage={errorMessage}
          submitLabel='Save Build'
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          formRef={formRef}
        />
        <PCPreview build={build} totalPrice={totalPrice} />
      </section>
    </main>
  )
}

export default CreateBuild
