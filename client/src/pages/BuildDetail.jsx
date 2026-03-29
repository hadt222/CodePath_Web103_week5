import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PCPreview from '../components/PCPreview'
import { deleteBuild, getBuild } from '../services/buildsApi'

const BuildDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [build, setBuild] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBuild = async () => {
      try {
        const data = await getBuild(id)
        setBuild(data)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBuild()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteBuild(id)
      navigate('/builds')
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  if (isLoading) {
    return (
      <main className='page-stack'>
        <section className='panel'><p>Loading build details...</p></section>
      </main>
    )
  }

  if (error) {
    return (
      <main className='page-stack'>
        <section className='panel'><p className='status-error'>{error}</p></section>
      </main>
    )
  }

  return (
    <main className='page-layout'>
      <section className='panel detail-panel'>
        <p className='eyebrow'>Build Details</p>
        <h1>{build.build_name}</h1>
        <div className='detail-grid'>
          <p><strong>Case:</strong> {build.case_color}</p>
          <p><strong>CPU:</strong> {build.cpu}</p>
          <p><strong>GPU:</strong> {build.gpu}</p>
          <p><strong>RAM:</strong> {build.ram}</p>
          <p><strong>Storage:</strong> {build.storage}</p>
          <p><strong>Cooling:</strong> {build.cooling}</p>
          <p><strong>RGB:</strong> {build.rgb ? 'On' : 'Off'}</p>
          <p><strong>Total:</strong> ${build.total_price}</p>
        </div>
        <div className='card-actions'>
          <Link to={`/builds/${id}/edit`} role='button' className='contrast'>Edit Build</Link>
          <Link to='/builds' role='button' className='secondary'>Back to Library</Link>
          <button type='button' className='outline' onClick={handleDelete}>Delete Build</button>
        </div>
      </section>

      <PCPreview build={build} totalPrice={build.total_price} />
    </main>
  )
}

export default BuildDetail
